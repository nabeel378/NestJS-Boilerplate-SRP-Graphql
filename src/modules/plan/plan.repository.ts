import { Injectable } from '@nestjs/common'
import { Plan, PlanDocument } from './plan.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePlanInput } from './dto/create-plan.input'

@Injectable()
export class PlanRepository {
  constructor(
    @InjectModel(Plan.name)
    private planModel: Model<PlanDocument>
  ) {}

  async create(plan: CreatePlanInput) {
    const createdSubscription = new this.planModel(plan)
    const result = await createdSubscription.save()
    return result.toObject({ versionKey: false })
  }

  findAll(findSubscriptionDTO: any) {
    return this.planModel.find(findSubscriptionDTO).exec()
  }
}
