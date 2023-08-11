import { InternalServerErrorException } from '@nestjs/common'
import {
  DataSource,
  FindOneOptions,
  Repository as TypeormRepository,
  UpdateResult
} from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'

class Base {
  id: number
}

export class Repository<T extends Base> {
  private baseRepository: TypeormRepository<T>
  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    this.baseRepository = new TypeormRepository<T>(
      target,
      dataSource.createEntityManager()
    )
  }

  all(params: Partial<T>): Promise<T[]> {
    return this.baseRepository.find({ where: params } as FindOneOptions<T>)
  }

  forId(id: number): Promise<T | undefined> {
    return this.baseRepository.findOne({ where: { id } } as FindOneOptions<T>)
  }

  one(params: Partial<T>): Promise<T | undefined> {
    return this.baseRepository.findOne({ where: params } as FindOneOptions<T>)
  }

  get(filter: Partial<T>): Promise<T | undefined> {
    return this.baseRepository.findOne({ where: filter } as FindOneOptions<T>)
  }

  count(filter: Partial<T>) {
    return this.baseRepository.count({ where: filter } as FindOneOptions<T>)
  }

  create(entity: Partial<T>): Promise<T> {
    let newEntity = this.baseRepository.create()
    Object.assign(newEntity, entity)
    return this.baseRepository.save(newEntity)
  }

  async update({
    id,
    entity
  }: {
    id: number
    entity: Partial<T>
  }): Promise<boolean> {
    try {
      const updateResult: UpdateResult = await this.baseRepository.update(
        id,
        entity
      )
      return updateResult.affected > 0
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
