import { Body, Controller, Get, Post } from '@nestjs/common';
import { Item } from './schemas/item.schema';
import { ItemsService } from './items.service';
import { CreateItemRequestDto } from './dtos/create-item.request.dto';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  async createItem(@Body() body: CreateItemRequestDto): Promise<Item> {
    return this.itemsService.createItem(body);
  }

  @Get()
  async getItems(): Promise<Item[]> {
    return this.itemsService.getItems();
  }
}
