import { UniversalLoggerService } from '../helper/universal-logger.service'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserRepository } from './user.repository'
import { ErrorMessageService } from '../helper/error-message.service'
import { FindOneUserArgs } from './dto/find-one-user.args'
import { AuthorizationConfig } from '../../core/configurations/authorization_config'
import * as bcrypt from 'bcrypt'
import { FindAllUserArgs } from './dto/find-all-user.args'

@Injectable()
export class UserService {
  constructor(
    private logger: UniversalLoggerService,
    private userRepository: UserRepository,
    private errorMessage: ErrorMessageService
  ) {
    this.logger.setContext(UserService.name)
  }

  async generateHashPassword(password: string) {
    return bcrypt.hash(password, AuthorizationConfig.saltOrRounds)
  }

  async isEmailRegister(email: string): Promise<boolean> {
    return !!(await this.userRepository.count({
      email
    }))
  }

  async create(createUserInput: CreateUserInput) {
    this.logger.log({ message: createUserInput, api: 'create' })
    try {
      const isEmailRegister = await this.isEmailRegister(createUserInput.email)
      if (isEmailRegister)
        throw new ConflictException(this.errorMessage.EMAIL_ALREADY_REGISTERED)
      const hashedPassword = await this.generateHashPassword(
        createUserInput.password
      )
      Object.assign(createUserInput, { password: hashedPassword })
      return await this.userRepository.create(createUserInput)
    } catch (error) {
      this.logger.error({ message: error, api: 'create' })
      throw new InternalServerErrorException(error)
    }
  }

  async findAll(findAllUserArgs: FindAllUserArgs) {
    return await this.userRepository.all(findAllUserArgs)
  }

  async findOne(findOneUserArgs: FindOneUserArgs) {
    this.logger.log({ message: findOneUserArgs, api: 'findOne' })
    try {
      return await this.userRepository.get(findOneUserArgs)
    } catch (error) {
      this.logger.error({ message: error, api: 'findOne' })
      throw new InternalServerErrorException(error)
    }
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    this.logger.log({ message: { updateUserInput, id }, api: 'update' })
    try {
      const user = await this.userRepository.get({ id })
      if (!user) throw new NotFoundException(this.errorMessage.USER_NOT_FOUND)

      Object.assign(user, updateUserInput)
      if (updateUserInput.password)
        Object.assign(user, {
          password: await this.generateHashPassword(updateUserInput.password)
        })
      return await this.userRepository.update({ id, params: updateUserInput })
    } catch (error) {
      this.logger.error({ message: error, api: 'findOne' })
      throw error
    }
  }
}
