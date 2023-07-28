import { Field, InputType } from '@nestjs/graphql'
import { Status } from 'src/common/enum/common.enum'

@InputType()
export class FindSubscriptionDTO {
  @Field({ nullable: true })
  userXid: string

  @Field({ nullable: true })
  orgXId: string

  @Field({ nullable: true })
  type: string

  @Field(() => Status, { nullable: true })
  status?: Status
}
