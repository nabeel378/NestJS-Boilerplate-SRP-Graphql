import { Injectable } from '@nestjs/common'
import { Subscription } from './subscription.schema'
import { SubscriptionRepository } from './subscription.repository'
import { FindSubscriptionDTO } from './dto/find-subscription.dto'

@Injectable()
export class SubscriptionService {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async create(subscription: Subscription) {
    return await this.subscriptionRepository.create(subscription)
  }

  async findAll(findSubscriptionDTO: FindSubscriptionDTO) {
    return await this.subscriptionRepository.findAll(findSubscriptionDTO)
  }
}
