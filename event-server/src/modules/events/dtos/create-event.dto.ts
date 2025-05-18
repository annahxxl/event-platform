import { EventStatus } from '../schemas/event.schema';

export class CreateEventDto {
  title: string;
  description?: string;
  status?: EventStatus;
  startDate: Date;
  endDate: Date;
}
