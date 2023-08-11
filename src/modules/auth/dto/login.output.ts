import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginOutput {
  @Field()
  id: string

  @Field()
  accessToken: string
}
