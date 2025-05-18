import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item } from './schemas/item.schema';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() dto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(dto);
  }

  @Get()
  async getItems(): Promise<Item[]> {
    return this.itemsService.getItems();
  }
}
