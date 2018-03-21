import * as passport from 'passport';
import { Guard, CanActivate } from '@nestjs/common';

import { AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../exceptions';

@Guard()
export class IsLoggedInGuard implements CanActivate {
    async canActivate(data: any): Promise<boolean> {
        const isAuthenticated = await new Promise<boolean>((resolve: any) => {
            passport.authenticate('jwt', { session: false }, (error: any, user: AuthorizedUser) => {
                if (error || !user) {
                    return resolve(false);
                }

                return resolve(true);
            })(data.res.req, data.res, data.next);
        });

        if (!isAuthenticated) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
