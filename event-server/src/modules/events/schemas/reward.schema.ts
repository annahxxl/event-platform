import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Item } from '../../items/schemas/item.schema';

@Schema({ timestamps: true })
export class Reward extends Document {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Event.name,
    required: true,
  })
  event: Event;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Item.name, required: true })
  item: Item;

  @Prop({ required: true })
  amount: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
