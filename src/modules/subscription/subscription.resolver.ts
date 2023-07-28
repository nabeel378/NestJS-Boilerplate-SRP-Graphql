import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { Subscription } from './subscription.schema'
import { SubscriptionService } from './subscription.service'
import { FindSubscriptionDTO } from './dto/find-subscription.dto'
import { CreateSubscriptionInput } from './dto/create-subscription.input'

@Resolver()
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query(() => [Subscription])
  async subscriptions(
    @Args('input') findSubscriptionDTO: FindSubscriptionDTO
  ): Promise<Subscription[]> {
    return this.subscriptionService.findAll(findSubscriptionDTO)
  }

  @Mutation(() => Subscription)
  createSubscription(
    @Args('input') subscriptionInput: CreateSubscriptionInput
  ): Promise<Subscription> {
    return this.subscriptionService.create(subscriptionInput)
  }
}
