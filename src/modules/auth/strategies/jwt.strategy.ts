import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthorizationConfig } from '../../../core/configurations/authorization_config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: AuthorizationConfig.secretKey,
      ignoreExpiration: false,
      signOptions: { expiresIn: AuthorizationConfig.expireIn }
    })
  }
}
