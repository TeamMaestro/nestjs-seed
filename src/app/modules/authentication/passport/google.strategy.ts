import * as config from 'config';
import * as passport from 'passport';
import { Injectable } from '@nestjs/common';
import { OAuth2Strategy, Profile } from 'passport-google-oauth';

import { UsersService } from '../../users';

@Injectable()
export class GoogleStrategy extends OAuth2Strategy {
    constructor(private readonly usersService: UsersService) {
        super(
            {
                // NEED TO REGISTER WITH GOOGLE AUTH AND PUT THIS INFO IN CONFIG
                clientID: config.get<string>('google.clientId'),
                clientSecret: config.get<string>('google.secret'),
                callbackURL: config.get<string>('domain') + '/api/auth/google/callback'
            },
            async (accessToken: string, refreshToken: string, profile: Profile, next: any) =>
                await this.verify(accessToken, refreshToken, profile, next)
        );
        passport.use(this);
    }

    public async verify(_accessToken: string, _refreshToken: string, profile: Profile, next: any) {
        if (profile._json.domain !== config.get<string>('google.authorizedDomain')) {
            return next(null, null);
        }

        const user = await this.usersService.fetchFromGoogle(profile);
        if (!user) {
            const createdUser = await this.usersService.createFromGoogle(profile);
            return next(null, createdUser);
        }
        return next(null, user);
    }
}
