import { DataSource } from 'typeorm'
import { User } from './user.entity'
import { Injectable } from '@nestjs/common'
import { Repository } from '../../common/repositories/repository'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource)
  }
}
