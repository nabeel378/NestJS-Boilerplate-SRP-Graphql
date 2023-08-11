import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginOutput } from './dto/login.output'
import { LoginInput } from './dto/login-auth.arg'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async login(@Args() credential: LoginInput) {
    return await this.authService.login(credential)
  }
}
