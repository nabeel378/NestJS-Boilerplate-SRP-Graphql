import { Injectable } from '@nestjs/common'
import * as moment from 'moment'

@Injectable()
export class DateHelper {
  getCurrentDate(): moment.Moment {
    return moment().utc(true)
  }

  formatToCustomFormat(date: moment.Moment, format: string): string {
    return date.format(format)
  }

  addDays(date: moment.Moment, days: number): moment.Moment {
    return date.clone().add(days, 'days')
  }
}
