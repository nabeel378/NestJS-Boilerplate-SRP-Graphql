import { Field, InputType } from '@nestjs/graphql'
import { SubscriptionType } from '../subscription.enum'

@InputType()
export class SubscribePlanInput {
  @Field()
  planId: string

  @Field()
  orgXId: string

  @Field()
  userXId: string

  @Field({ defaultValue: false })
  isAddon?: boolean

  @Field(() => SubscriptionType, { defaultValue: SubscriptionType.Individual })
  type: SubscriptionType
}
