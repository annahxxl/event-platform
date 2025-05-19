import { EventStatus } from '../../schemas/event.schema';

export class CreateEventRequestDto {
  title: string;
  description?: string;
  status?: EventStatus;
  startDate: Date;
  endDate: Date;
}
