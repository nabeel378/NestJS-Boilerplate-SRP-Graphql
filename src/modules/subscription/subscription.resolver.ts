import { Resolver, Query } from '@nestjs/graphql'
import { Subscription } from './dto/subscription'

@Resolver()
export class SubscriptionResolver {
  @Query(() => Subscription)
  getUsers(): Subscription {
    return new Subscription()
  }
}
