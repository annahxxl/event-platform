import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({ required: true })
  userId: string;

  // 연속 출석일수
  @Prop({ required: true, default: 0 })
  streak: number;

  @Prop({ required: true, default: Date.now })
  lastAttendanceDate: Date;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
