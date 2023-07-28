import { Field, InputType } from '@nestjs/graphql'
import { SubscriptionType } from '../subscription.enum'
import { Status } from 'src/common/enum/common.enum'

@InputType()
export class CreateSubscriptionInput {
  @Field({ nullable: true })
  name: string

  @Field()
  planId: string

  @Field()
  orgXId: string

  @Field()
  userXId: string

  @Field()
  noOfDevices: number

  @Field({ nullable: true })
  noOfUsers: number

  @Field(() => SubscriptionType, { defaultValue: SubscriptionType.Individual })
  type: SubscriptionType

  @Field(() => Status, { defaultValue: Status.Active })
  status: Status
}
