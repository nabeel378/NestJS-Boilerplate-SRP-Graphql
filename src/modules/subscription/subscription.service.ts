import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Subscription } from './subscription.schema'
import { SubscriptionRepository } from './subscription.repository'
import { FindSubscriptionDTO } from './dto/find-subscription.dto'
import { PlanService } from '../plan/plan.service'
import { CreateSubscriptionInput } from './dto/create-subscription.input'
import { SubscribeOrgInput } from './dto/subscribe-org.input'
import { Status } from 'src/common/enum/common.enum'
import { PlanType } from '../plan/plan.enum'

@Injectable()
export class SubscriptionService {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private planService: PlanService
  ) {}

  async getActivePlan(planId: string) {
    const plans = await this.planService.findAll({
      _id: planId
    })
    if (!plans.length || plans[0].status === Status.InActive)
      throw new NotFoundException(
        'The plan may be inactive or is currently unavailable.'
      )
    return plans[0]
  }
  async subscriptionForOrg(subscribeOrgInput: SubscribeOrgInput) {
    const plan = await this.getActivePlan(subscribeOrgInput.planId)
    if (plan.type != PlanType.Owner) {
      throw new ConflictException(
        'This plan is available for the organization.'
      )
    }
  }
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
