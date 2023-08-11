import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { Status } from '../../../common/enum/common.enum'

@ArgsType()
export class FindAllUserArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  id?: number

  @Field({ nullable: true })
  @IsOptional()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  status?: Status
}
