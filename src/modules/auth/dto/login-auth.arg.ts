import { Field, ArgsType } from '@nestjs/graphql'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

@ArgsType()
export class LoginInput {
  @IsEmail()
  @Field({ nullable: true })
  email?: string

  @MinLength(5)
  @MaxLength(20)
  @IsString()
  @Field({ nullable: true })
  password: string
}
