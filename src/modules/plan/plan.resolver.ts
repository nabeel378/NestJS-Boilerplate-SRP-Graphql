import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { PlanService } from './plan.service'
import { CreatePlanInput } from './dto/create-plan.input'
import { Plan } from './plan.schema'
import { FindPlanInput } from './dto/find-plan.input'

@Resolver(() => Plan)
export class PlanResolver {
  constructor(private readonly planService: PlanService) {}

  @Mutation(() => Plan)
  createPlan(@Args('createPlanInput') createPlanInput?: CreatePlanInput) {
    return this.planService.create(createPlanInput)
  }

  @Query(() => [Plan])
  plans(@Args('findPlanInput') findPlanInput: FindPlanInput) {
    return this.planService.findAll(findPlanInput)
  }
}
