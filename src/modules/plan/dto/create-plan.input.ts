import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql'
import { PlanType } from '../plan.enum'
import { Status } from 'src/common/enum/common.enum'
import { IsEnum, IsNumber, Min } from 'class-validator'

@InputType()
export class CreatePlanInput {
  @Field(() => String)
  orgXId: string

  @IsEnum(PlanType)
  @Field(() => PlanType, { defaultValue: PlanType.Owner })
  type: PlanType

  @Field()
  title: string

  @Field({ nullable: true })
  description: string

  @Field()
  fees: number

  @IsNumber()
  @Min(1)
  @Field()
  duration: number

  @IsNumber()
  @Field({ nullable: true })
  yearlyDiscount: number

  @Field(() => Status, { defaultValue: Status.Active })
  status: Status

  @Field({ nullable: true })
  noOfDevices: number

  @Field({ nullable: true })
  noOfUsers: number

  createdAt: Date
}
