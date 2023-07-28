import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform } from 'class-transformer';

export type SubscriptionsDocument = Subscriptions & Document;

@Schema()
export class Subscriptions {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;
}

export const SubscriptionsSchema = SchemaFactory.createForClass(Subscriptions);
