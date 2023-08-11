import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common'
import { LoginInput } from './dto/login-auth.arg'
import { UserService } from '../user/user.service'
import * as bcrypt from 'bcrypt'
import { ErrorMessageService } from '../helper/error-message.service'
import { User } from '../user/user.entity'
import { AuthorizationConfig } from 'src/core/configurations/authorization_config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private errorMessageService: ErrorMessageService,
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async generateAccessToken(user: User) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        createdAt: new Date().getTime(),
        expiryTime: AuthorizationConfig.expireIn,
        userClaims: {
          userType: user.status
        }
      }
      return await this.jwtService.signAsync(payload)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login(loginInput: LoginInput) {
    const user = await this.userService.findOne({ email: loginInput.email })
    const isPasswordMatch = await bcrypt.compare(
      loginInput.password,
      user.password
    )
    if (!isPasswordMatch)
      throw new UnauthorizedException(
        this.errorMessageService.WRONG_EMAIL_OR_PASSWORD
      )
    return { accessToken: await this.generateAccessToken(user) }
  }
}
