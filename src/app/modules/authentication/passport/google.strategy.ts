import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ErrorHandler, UnauthorizedException } from '@teamhive/nestjs-common';
import * as config from 'config';
import { OAuth2Strategy, Profile } from 'passport-google-oauth';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';
import { UserService } from '../../user/services/user/user.service';
import { StoredUser } from '../../user/classes/stored-user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy, PassportStrategyTokens.GoogleStrategy) {
    constructor(
        private readonly userService: UserService,
        private readonly errorHandler: ErrorHandler
    ) {
        super({
            /*
             * TODO: NEED TO REGISTER WITH GOOGLE AUTH AND PUT THIS INFO IN CONFIG
             */
            clientID: config.get<string>('authentication.passport.google.clientId'),
            clientSecret: config.get<string>('authentication.passport.google.secret'),
            callbackURL: `${config.get<string>('authentication.passport.google.callbackUrl')}`,
            scope: ['profile', 'email']
        });
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
        if (profile._json.hd !== config.get<string>('authentication.passport.google.authorizedDomain')) {
            throw new UnauthorizedException();
        }

        try {
            let user = await this.userService.fetchFromGoogle(profile);

            if (!user) {
                user = await this.userService.createFromGoogle(profile);
            }

            return new StoredUser(user);
        }
        catch (error) {
            this.errorHandler.captureException(error);
            throw new UnauthorizedException();
        }
    }
}
