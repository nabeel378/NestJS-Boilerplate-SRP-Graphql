import { ArgsType, Field, Int } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { Status } from '../../../common/enum/common.enum'
import { PaginationArgs } from '../../../common/dto/pagination.args'

@ArgsType()
export class FindAllUserArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsOptional()
  email?: string

  @Field({ nullable: true })
  @IsOptional()
  status?: Status
}
