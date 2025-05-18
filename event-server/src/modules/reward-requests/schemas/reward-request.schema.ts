import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Reward } from '../../events/schemas/reward.schema';

export enum RewardRequestStatus {
  APPROVED = 'APPROVED', // 승인
  REJECTED = 'REJECTED', // 거절
  CLAIMED = 'CLAIMED', // 수령
}

@Schema({ timestamps: true })
export class RewardRequest extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Reward.name,
    required: true,
  })
  reward: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({
    type: String,
    enum: Object.values(RewardRequestStatus),
  })
  status: RewardRequestStatus;

  @Prop()
  failureReason: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
