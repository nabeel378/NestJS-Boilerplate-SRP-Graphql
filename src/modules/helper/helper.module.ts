import { Module } from '@nestjs/common'
import { DateHelper } from './date.service'
import { CustomLoggerService } from './custom-logger.service'

@Module({
  imports: [],
  providers: [DateHelper, CustomLoggerService]
})
export class HelperModule {}
