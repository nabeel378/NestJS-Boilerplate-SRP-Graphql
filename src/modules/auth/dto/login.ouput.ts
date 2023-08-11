import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginOutput {
  @Field({ nullable: true })
  accessToken: string
}
