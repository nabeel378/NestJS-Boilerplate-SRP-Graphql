import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class FindSubscriptionDTO {
  @Field({ nullable: true })
  userXid: string

  @Field({ nullable: true })
  orgXId: string

  @Field({ nullable: true })
  type: string

  @Field({ nullable: true })
  status: string
}
