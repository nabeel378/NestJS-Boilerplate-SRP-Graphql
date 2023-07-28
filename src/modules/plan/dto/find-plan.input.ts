import { Field, InputType } from '@nestjs/graphql'
import { PlanType } from '../plan.enum'
import { Status } from 'src/common/enum/common.enum'

@InputType()
export class FindPlanInput {
  @Field()
  orgXId?: string

  @Field(() => PlanType, { nullable: true })
  type?: PlanType

  @Field(() => Status, { nullable: true })
  status?: Status
}
