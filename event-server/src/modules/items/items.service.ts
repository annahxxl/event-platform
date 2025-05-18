import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './schemas/item.schema';
import { CreateItemDto } from './dtos/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async createItem(dto: CreateItemDto): Promise<Item> {
    const createdItem = await this.itemModel.create(dto);
    return createdItem;
  }

  async getItems(): Promise<Item[]> {
    return this.itemModel.find();
  }
}
