import { Field, ID, ObjectType } from '@nestjs/graphql'
import { Type } from '../user.enum'
import { Status } from 'src/common/enum/common.enum'

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  id: number

  @Field()
  email: string

  @Field({ nullable: true })
  type: Type

  @Field({ nullable: true })
  status: Status
}
