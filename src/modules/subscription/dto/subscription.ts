import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Subscription {
  @Field()
  id: string

  @Field()
  name: string

  // Add other fields as needed
}
