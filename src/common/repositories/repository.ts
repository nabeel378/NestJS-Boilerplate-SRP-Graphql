import { InternalServerErrorException } from '@nestjs/common'
import {
  DataSource,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
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
  async all(
    params: FindOptionsWhere<T> & { page: number; limit: number }
  ): Promise<T[]> {
    const { page, limit, ...filter } = params

    const findOptions: FindManyOptions<T> = {
      where: filter as FindOptionsWhere<T>
    }

    if (page && limit) {
      const skip = (page - 1) * limit
      findOptions.skip = skip
      findOptions.take = limit
    }

    return this.baseRepository.find(findOptions)
  }

  forId(id: number): Promise<T | undefined> {
    return this.baseRepository.findOne({ where: { id } } as FindOneOptions<T>)
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

  /**
   *
   * @param id is for find the entity
   * @param params is for update the entity
   * @returns
   */
  async update({
    id,
    params
  }: {
    id: number
    params: Partial<T>
  }): Promise<boolean> {
    try {
      const updateResult: UpdateResult = await this.baseRepository.update(
        id,
        params
      )
      return updateResult.affected > 0
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
