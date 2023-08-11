import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { AuthorizationConfig } from '../../core/configurations/authorization_config'
import { JwtModule } from '@nestjs/jwt'
import { ErrorMessageService } from '../helper/error-message.service'
import { UserService } from '../user/user.service'
import { UniversalLoggerService } from '../helper/universal-logger.service'
import { UserRepository } from '../user/user.repository'

@Module({
  imports: [
    JwtModule.register({
      secret: AuthorizationConfig.secretKey,
      signOptions: { expiresIn: AuthorizationConfig.expireIn }
    })
  ],
  providers: [
    AuthResolver,
    AuthService,
    ErrorMessageService,
    UserService,
    UniversalLoggerService,
    UserRepository
  ]
})
export class AuthModule {}
