import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class FindOneUserInput {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number

  @Field({ nullable: true })
  @IsOptional()
  email?: string
}
