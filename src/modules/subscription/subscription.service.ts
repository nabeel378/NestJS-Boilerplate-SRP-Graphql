import { Injectable } from '@nestjs/common'
import { Subscription } from './subscription.schema'
import { SubscriptionRepository } from './subscription.repository'
import { FindSubscriptionDTO } from './dto/find-subscription.dto'
import { PlanService } from '../plan/plan.service'
import { CreateSubscriptionInput } from './dto/create-subscription.input'

@Injectable()
export class SubscriptionService {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private planService: PlanService
  ) {}

  async create(subscriptionInput: CreateSubscriptionInput) {
    const plan = await this.planService.findAll({
      _id: subscriptionInput.planId!
    })
    const subscription = new Subscription()
    Object.assign(subscription, subscriptionInput)
    Object.assign(subscription, { plan: plan[0] })

    return await this.subscriptionRepository.create(subscription)
  }

  async findAll(findSubscriptionDTO: FindSubscriptionDTO) {
    return await this.subscriptionRepository.findAll(findSubscriptionDTO)
  }
}
