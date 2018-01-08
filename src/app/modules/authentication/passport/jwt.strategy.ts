import * as config from 'config';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';
import { UnauthorizedException } from '../../common/exceptions/unauthorized.exception';

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authenticationService: AuthenticationService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: config.get<string>('secret'),
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.authenticationService.validateUser(payload);
        if (!isValid) {
            throw new UnauthorizedException();
        }
        done(null, payload);
    }
}
