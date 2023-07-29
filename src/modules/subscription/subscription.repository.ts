import { Injectable } from '@nestjs/common'
import { Subscription, SubscriptionDocument } from './subscription.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { FindSubscriptionDTO } from './dto/find-subscription.dto'

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>
  ) {}

  async create(subscription: Subscription) {
    const createdSubscription = new this.subscriptionModel(subscription)
    const result = await createdSubscription.save()
    return result.toObject({ versionKey: false })
  }

  findAll(findSubscriptionDTO: FindSubscriptionDTO) {
    return this.subscriptionModel
      .find(findSubscriptionDTO)
      .populate('plan')
      .exec()
  }
}
