import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Date, Document, ObjectId } from 'mongoose'
import { Transform } from 'class-transformer'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { IsNumber, Min } from 'class-validator'
import { Status } from 'src/common/enum/common.enum'
import { PlanType } from './plan.enum'

export type PlanDocument = Plan & Document

@Schema()
@ObjectType()
@InputType('PlanInput')
export class Plan {
  @Transform(({ value }) => value.toString())
  @Field(() => String)
  _id: ObjectId

  @Prop()
  @Field()
  orgXId: string

  @Prop()
  @Field()
  type: PlanType

  @Prop()
  @Field({ nullable: true })
  title: string

  @Prop()
  @Field({ nullable: true })
  description: string

  @Prop()
  @Field()
  fees: number

  @Prop()
  @IsNumber()
  @Min(1)
  @Field()
  duration: number

  @Prop()
  @IsNumber()
  @Field({ nullable: true })
  yearlyDiscount: number

  @Prop()
  @Field({ nullable: true })
  status: Status

  @Prop()
  @Field({ nullable: true })
  noOfDevices: number

  @Prop()
  @Field({ nullable: true })
  noOfUsers: number

  @Prop({ type: Date, default: Date.now })
  @Field(() => Date)
  createdAt: Date
}

export const PlanSchema = SchemaFactory.createForClass(Plan)
