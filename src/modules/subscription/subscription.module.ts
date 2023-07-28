import { Module } from '@nestjs/common'
import { SubscriptionResolver } from './subscription.resolver'
import { SubscriptionService } from './subscription.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscriptionsSchema, Subscription } from './subscription.schema'
import { SubscriptionRepository } from './subscription.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionsSchema }
    ])
  ],

  providers: [SubscriptionResolver, SubscriptionRepository, SubscriptionService]
})
export class SubscriptionModule {}
