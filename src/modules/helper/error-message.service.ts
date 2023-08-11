import { Injectable } from '@nestjs/common'

@Injectable()
export class ErrorMessageService {
  ACCESS_DENIED =
    'Access Denied: This operation is only allowed for administrators.'
  IP_ALREADY_EXIST = 'This IP address is already assigned within the system.'
  EMAIL_ALREADY_REGISTERED = `Email is already registered`
  WRONG_EMAIL_OR_PASSWORD = `The provided email or password does not match.`
  USER_NOT_FOUND = `User not found.`
}
