import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSubscriptionDTO {
  @Field()
  id: string

  @Field()
  name: string

  // Add other fields as needed
}
