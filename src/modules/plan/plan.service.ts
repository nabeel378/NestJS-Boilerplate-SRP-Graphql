import { Injectable } from '@nestjs/common'
import { CreatePlanInput } from './dto/create-plan.input'
import { FindPlanInput } from './dto/find-plan.input'
import { PlanRepository } from './plan.repository'

@Injectable()
export class PlanService {
  constructor(private planRepository: PlanRepository) {}

  async create(plan: CreatePlanInput) {
    return await this.planRepository.create(plan)
  }

  async findAll(findSubscriptionDTO: FindPlanInput) {
    return await this.planRepository.findAll(findSubscriptionDTO)
  }
}
