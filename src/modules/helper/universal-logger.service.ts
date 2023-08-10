import { Injectable, Scope, ConsoleLogger } from '@nestjs/common'

@Injectable({ scope: Scope.TRANSIENT })
export class UniversalLoggerService extends ConsoleLogger {
  constructor(context: string) {
    super(context)
  }
  log({
    message,
    api
  }: {
    message: string | Object | Array<unknown>
    api: string
  }) {
    super.log(`${JSON.stringify(message)} - ${api}`)
  }

  error({
    message,
    api
  }: {
    message: string | Object | Array<unknown>
    api: string
  }) {
    super.error(`${JSON.stringify(message)} - ${api}`)
  }
}
