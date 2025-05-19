import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemRequestDto } from './dtos/create-item.request.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async createItem(body: CreateItemRequestDto): Promise<Item> {
    const createdItem = await this.itemModel.create(body);
    return createdItem;
  }

  async getItems(): Promise<Item[]> {
    return this.itemModel.find();
  }
}
