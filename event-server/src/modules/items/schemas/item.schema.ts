import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ItemType {
  EQUIPMENT = 'EQUIPMENT', // 장비 (무기, 방어구, 악세사리 등)
  RESOURCE = 'RESOURCE', // 재화 (골드, 보석, 재료 등)
  CONSUMABLE = 'CONSUMABLE', // 소모품 (물약, 포션, 음식 등)
}

@Schema({ timestamps: true })
export class Item extends Document {
  @Prop({
    required: true,
    enum: Object.values(ItemType),
  })
  type: ItemType;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
