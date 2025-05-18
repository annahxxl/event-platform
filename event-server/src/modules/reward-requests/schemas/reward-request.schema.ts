import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Reward } from '../../events/schemas/reward.schema';

export enum RewardRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CLAIMED = 'CLAIMED',
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
    default: RewardRequestStatus.PENDING,
  })
  status: RewardRequestStatus;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
