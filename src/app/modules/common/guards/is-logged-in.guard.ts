import * as passport from 'passport';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../exceptions';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        const isAuthenticated = await new Promise<boolean>((resolve: any) => {
            passport.authenticate('jwt', { session: false }, (error: any, user: AuthorizedUser) => {
                if (error || !user) {
                    return resolve(false);
                }

                req.user = user;

                return resolve(true);
            })(req, res, req.next);
        });

        if (!isAuthenticated) {
            throw new UnauthorizedException();
        }
        return true;
    }
}
