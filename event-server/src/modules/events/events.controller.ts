import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';
import { CreateEventDto } from './dtos/create-event.dto';
import { CreateRewardDto } from './dtos/create-reward.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() dto: CreateEventDto): Promise<Event> {
    return this.eventsService.createEvent(dto);
  }

  @Get()
  async getEvents(): Promise<Event[]> {
    return this.eventsService.getEvents();
  }

  @Get(':id')
  async getEventById(@Param('id') id: string): Promise<Event> {
    return this.eventsService.getEventById(id);
  }

  @Post(':id/rewards')
  async createReward(
    @Param('id') id: string,
    @Body() dto: CreateRewardDto,
  ): Promise<Event> {
    return this.eventsService.createReward(id, dto);
  }
}
