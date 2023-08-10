import { UniversalLoggerService } from '../helper/universal-logger.service'
import {
  ConflictException,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserRepository } from './user.repository'
import { ErrorMessageService } from '../helper/error-message.service'

@Injectable()
export class UserService {
  constructor(
    private logger: UniversalLoggerService,
    private userRepository: UserRepository,
    private errorMessage: ErrorMessageService
  ) {
    this.logger.setContext(UserService.name)
  }

  async isEmailRegister(email: string): Promise<boolean> {
    return !!(await this.userRepository.count({
      email
    }))
  }

  async create(createUserInput: CreateUserInput) {
    this.logger.log({ message: createUserInput, api: 'create' })
    try {
      const isEmailRegister = this.isEmailRegister(createUserInput.email)
      if (isEmailRegister)
        throw new ConflictException(this.errorMessage.EMAIL_ALREADY_REGISTERED)
      return await this.userRepository.create(createUserInput)
    } catch (error) {
      this.logger.error({ message: error, api: 'create' })
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
