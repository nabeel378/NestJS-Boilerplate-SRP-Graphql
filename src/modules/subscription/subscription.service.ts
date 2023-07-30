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
import { DateHelper } from '../helper/date.service'
import { SubscriptionType } from './subscription.enum'
import { CustomLoggerService } from '../helper/custom-logger.service'
import { SubscribePlanInput } from './dto/subscribe-plan.input'

@Injectable()
export class SubscriptionService {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private planService: PlanService,
    private dateHelper: DateHelper,
    private loggerService: CustomLoggerService
  ) {
    this.loggerService.setContext(SubscriptionService.name)
  }
  private async getSubscribedPlan({
    userXId,
    orgXId
  }: {
    userXId: string
    orgXId: string
  }) {
    const currentDate = this.dateHelper.getCurrentDate()
    const subscription =
      await this.subscriptionRepository.getActiveSubscription({
        userXId,
        orgXId,
        date: currentDate
      })
    if (!subscription)
      throw new NotFoundException(
        'Subscription is either expired or not found.'
      )
    return subscription
  }

  private async isPlanSubscribed({
    userXId,
    orgXId
  }: {
    userXId: string
    orgXId: string
  }) {
    const currentDate = this.dateHelper.getCurrentDate()
    const subscription =
      await this.subscriptionRepository.getActiveSubscription({
        userXId,
        orgXId,
        date: currentDate
      })
    return subscription.length ? true : false
  }

  private async subscriptionForOrg({
    orgXId,
    userXId,
    planId
  }: SubscribeOrgInput) {
    try {
      const plan = await this.planService.getActivePlan(planId)
      const currentDate = this.dateHelper.getCurrentDate()
      if (plan.type != PlanType.Owner)
        throw new ConflictException(
          'This plan is available for the organization.'
        )
      const isPlanSubscribed = await this.isPlanSubscribed({ orgXId, userXId })
      if (isPlanSubscribed)
        throw new ConflictException('Plan is already subscribed.')
      const subscription = new Subscription()
      Object.assign(subscription, {
        userXId,
        orgXId,
        plan,
        startDate: currentDate,
        endDate: this.dateHelper.addDays(currentDate, plan.duration),
        status: Status.Active,
        type: SubscriptionType.Business,
        isAddOn: false
      })
      this.loggerService.log(subscription, 'subscriptionForOrg')
      return await this.subscriptionRepository.create(subscription)
    } catch (error) {
      this.loggerService.error(error)
      throw error
    }
  }

  async subscribePlan(subscribePlanInput: SubscribePlanInput) {
    if (subscribePlanInput.type == SubscriptionType.Business)
      return await this.subscriptionForOrg(subscribePlanInput)

    throw new NotFoundException("Subscription type doesn't exist.")
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
