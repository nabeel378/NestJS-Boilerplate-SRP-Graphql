import { InputType, Field, Int } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'

@InputType()
export class FindOneUserArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number

  @Field({ nullable: true })
  @IsOptional()
  email?: string
}
