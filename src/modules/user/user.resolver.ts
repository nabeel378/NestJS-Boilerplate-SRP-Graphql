import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UserService } from './user.service'
import { User } from './user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { FindAllUserArgs } from './dto/find-all-user.args'
import { UserOutput } from './dto/user.output'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @Query(() => UserOutput, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne({ id })
  }

  @Query(() => [UserOutput], { name: 'users' })
  findAll(@Args() findAllUserArgs: FindAllUserArgs) {
    return this.userService.findAll(findAllUserArgs)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }
}
