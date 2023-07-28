import { Module } from '@nestjs/common'
import { SubscriptionResolver } from './subscription.resolver'
import { SubscriptionService } from './subscription.service'
import { MongooseModule } from '@nestjs/mongoose'
import { SubscriptionsSchema, Subscription } from './subscription.schema'
import { SubscriptionRepository } from './subscription.repository'
import { PlanService } from '../plan/plan.service'
import { PlanRepository } from '../plan/plan.repository'
import { Plan, PlanSchema } from '../plan/plan.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionsSchema },
      { name: Plan.name, schema: PlanSchema }
    ])
  ],

  providers: [
    SubscriptionResolver,
    PlanService,
    PlanRepository,
    SubscriptionRepository,
    SubscriptionService
  ]
})
export class SubscriptionModule {}
