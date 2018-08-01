import * as passport from 'passport';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { AuthorizedUser } from '../../users';
import { UnauthorizedException } from '../exceptions';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        const authErrorMessage = await new Promise<string>((resolve: any) => {
            passport.authenticate('jwt', { session: false }, (customError: any, user: AuthorizedUser, passportError: any) => {
                if (customError || !user || passportError) {
                    return resolve(customError || passportError.message);
                }

                req.user = user;

                return resolve('NO_ERROR');
            })(req, res, req.next);
        });

        if (authErrorMessage !== 'NO_ERROR') {
            throw new UnauthorizedException(authErrorMessage);
        }
        return true;
    }
}
