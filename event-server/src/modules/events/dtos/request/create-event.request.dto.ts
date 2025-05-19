import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  AttendanceConditionConfig,
  ConditionType,
  EventStatus,
} from '../../schemas/event.schema';

export class CreateEventRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;

  @IsEnum(ConditionType)
  @IsNotEmpty()
  conditionType: ConditionType;

  @IsObject()
  @IsNotEmpty()
  conditionConfig: AttendanceConditionConfig;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
