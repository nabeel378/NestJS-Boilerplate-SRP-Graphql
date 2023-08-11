import { Field, ID, ObjectType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'
import { Type } from './user.enum'
import { Status } from 'src/common/enum/common.enum'

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number

  @Column({ nullable: true, unique: true })
  @IsEmail()
  @Field()
  email: string

  @Column({ nullable: true })
  @Field()
  password: string

  @Column({ default: Type.User })
  @Field({ nullable: true })
  type: Type

  @Column({ default: Status.Active })
  @Field({ nullable: true })
  status: Status
}
