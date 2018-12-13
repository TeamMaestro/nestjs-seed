import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ErrorHandler, RedirectException } from '@teamhive/nestjs-common';
import * as config from 'config';
import { OAuth2Strategy, Profile } from 'passport-google-oauth';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';
import { AuthorizedUser } from '../../user/classes/authorized-user';
import { UserService } from '../../user/services/user/user.service';

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
        const failureRedirect = `${config.get<string>('authentication.errorRoute')}?google`;

        if (profile._json.domain !== config.get<string>('authentication.passport.google.authorizedDomain')) {
            throw new RedirectException(failureRedirect);
        }

        try {
            let user = await this.userService.fetchFromGoogle(profile);

            if (!user) {
                user = await this.userService.createFromGoogle(profile);
            }

            return new AuthorizedUser(user);
        }
        catch (error) {
            this.errorHandler.captureException(error);
            throw new RedirectException(failureRedirect);
        }
    }
}
