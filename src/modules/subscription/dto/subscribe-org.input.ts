import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SubscribeOrgInput {
  @Field()
  planId: string

  @Field()
  orgXId: string

  @Field()
  userXId: string

  @Field({ defaultValue: false })
  isAddon: boolean
}
