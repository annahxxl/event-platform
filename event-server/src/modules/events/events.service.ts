import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../items/schemas/item.schema';
import { CreateEventRequestDto } from './dtos/request/create-event.request.dto';
import { CreateRewardRequestDto } from './dtos/request/create-reward.request.dto';
import { Event } from './schemas/event.schema';
import { Reward } from './schemas/reward.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Item.name) private itemModel: Model<Item>,
    @InjectModel(Reward.name) private rewardModel: Model<Reward>,
  ) {}

  async createEvent(body: CreateEventRequestDto): Promise<Event> {
    return await this.eventModel.create(body);
  }

  async getEvents(): Promise<Event[]> {
    return this.eventModel.find().populate('rewards');
  }

  async getEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).populate('rewards');
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  async createReward(id: string, body: CreateRewardRequestDto): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    const item = await this.itemModel.findById(body.itemId);
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    const reward = await this.rewardModel.create({
      event: event._id,
      item: item._id,
      amount: body.amount,
    });
    await this.eventModel.findByIdAndUpdate(id, {
      $push: { rewards: reward._id },
    });
    return await this.eventModel.findById(id).populate('rewards');
  }
}
