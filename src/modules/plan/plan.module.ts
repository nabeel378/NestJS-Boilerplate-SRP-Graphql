import { Module } from '@nestjs/common'
import { PlanService } from './plan.service'
import { PlanResolver } from './plan.resolver'
import { PlanRepository } from './plan.repository'
import { MongooseModule } from '@nestjs/mongoose'
import { Plan, PlanSchema } from './plan.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }])
  ],
  providers: [PlanService, PlanResolver, PlanRepository]
})
export class PlanModule {}
