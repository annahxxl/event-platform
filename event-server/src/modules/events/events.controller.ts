import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';
import { CreateEventRequestDto } from './dtos/request/create-event.request.dto';
import { CreateRewardRequestDto } from './dtos/request/create-reward.request.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() body: CreateEventRequestDto): Promise<Event> {
    return this.eventsService.createEvent(body);
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
    @Body() body: CreateRewardRequestDto,
  ): Promise<Event> {
    return this.eventsService.createReward(id, body);
  }
}
