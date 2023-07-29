import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePlanInput } from './dto/create-plan.input'
import { FindPlanInput } from './dto/find-plan.input'
import { PlanRepository } from './plan.repository'
import { Status } from 'src/common/enum/common.enum'

@Injectable()
export class PlanService {
  constructor(private planRepository: PlanRepository) {}

  async create(plan: CreatePlanInput) {
    return await this.planRepository.create(plan)
  }

  async findAll(findSubscriptionDTO: FindPlanInput) {
    return await this.planRepository.findAll(findSubscriptionDTO)
  }

  async getActivePlan(planId: string) {
    const plans = await this.planRepository.findAll({
      _id: planId
    })
    if (!plans.length || plans[0].status === Status.InActive)
      throw new NotFoundException(
        'The plan may be inactive or is currently unavailable.'
      )
    return plans[0]
  }
}
