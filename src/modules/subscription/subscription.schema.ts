import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, Document, ObjectId } from 'mongoose'
import { Transform } from 'class-transformer'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { SubscriptionType } from './subscription.enum'
import { IsEnum } from 'class-validator'
import { Status } from 'src/common/enum/common.enum'

export type SubscriptionDocument = Subscription & Document

@Schema()
@ObjectType()
@InputType('SubscriptionInput')
export class Subscription {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  @Field({ nullable: true })
  name: string

  // @Field(() => Plans)
  // Plan: Plans

  @Prop()
  @Field({ nullable: true })
  orgXId: string

  @Prop()
  @Field({ nullable: true })
  userXId: string

  @Prop({ type: Date, default: Date.now }) // Define the Date field
  @Field(() => Date, { nullable: true })
  startDate: Date

  @Prop({ type: Date })
  @Field(() => Date, { nullable: true })
  endDate: Date

  @Prop()
  @Field({ nullable: true })
  noOfDevices: number

  @Prop()
  @Field({ nullable: true })
  noOfUsers: number

  @Prop()
  @Field(() => SubscriptionType, { defaultValue: SubscriptionType.Individual })
  type: SubscriptionType

  @Prop()
  @Field({ nullable: true, defaultValue: Status.Active })
  status: Status

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const SubscriptionsSchema = SchemaFactory.createForClass(Subscription)
