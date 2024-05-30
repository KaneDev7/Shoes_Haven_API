import { Injectable } from '@nestjs/common';
import { ExtractJwt} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy } from 'passport-local';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: `${process.env.TOKEN_SECRET}`
      });
    }

    async validate(payload: any) {
      console.log('hello')
      return { userId: payload.userId, username: payload.username };
    }
  }