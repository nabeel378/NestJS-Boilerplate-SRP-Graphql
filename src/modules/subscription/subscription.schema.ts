import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Date, Document, ObjectId } from 'mongoose'
import { Transform } from 'class-transformer'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { SubscriptionType } from './subscription.enum'
import { Status } from 'src/common/enum/common.enum'
import { Plan } from '../plan/plan.schema'

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subscription.name })
  @Field({ nullable: true })
  subscription: Subscription

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Plan.name })
  @Field({ nullable: true })
  plan: Plan

  @Prop([{ type: mongoose.Schema.Types.String, default: [] }])
  @Field(() => [String], { nullable: true })
  vehicleXId: string[]

  @Prop()
  @Field({ nullable: true })
  orgXId: string

  @Prop()
  @Field({ nullable: true })
  userXId: string

  @Prop({ type: Date, default: Date.now })
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

  @Prop({ default: false })
  @Field({ defaultValue: false })
  isAddon: boolean

  @Prop()
  @Field({ nullable: true })
  status: Status

  @Prop({ type: Date, default: Date.now })
  createdAt: Date
}

export const SubscriptionsSchema = SchemaFactory.createForClass(Subscription)
