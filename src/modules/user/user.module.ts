import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { UserRepository } from './user.repository'
import { UniversalLoggerService } from '../helper/universal-logger.service'
import { ErrorMessageService } from '../helper/error-message.service'

@Module({
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    UniversalLoggerService,
    ErrorMessageService
  ]
})
export class UserModule {}
