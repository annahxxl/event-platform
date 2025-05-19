import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum EventStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum ConditionType {
  ATTENDANCE = 'ATTENDANCE',
}

export type AttendanceConditionConfig = {
  requiredDays: number;
};

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: Object.values(EventStatus),
    default: EventStatus.INACTIVE,
  })
  status: EventStatus;

  @Prop({
    required: true,
    enum: Object.values(ConditionType),
  })
  conditionType: ConditionType;

  @Prop({
    type: Object,
    required: true,
  })
  conditionConfig: AttendanceConditionConfig;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Reward' }] })
  rewards: MongooseSchema.Types.ObjectId[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
