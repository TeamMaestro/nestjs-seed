import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorHandler, PassiveException, RedirectException } from '@teamhive/nestjs-common';
import * as config from 'config';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';

@Injectable()
export class GoogleAuthGaurd extends AuthGuard(PassportStrategyTokens.GoogleStrategy) {
    constructor(
        private readonly errorHandler: ErrorHandler
    ) {
        super();
    }

    handleRequest(error: Error, user: any, passportError: Error) {
        if (!user) {
            const exception = error || passportError;
            if (!(exception instanceof PassiveException) ) {
                this.errorHandler.captureException(exception);
            }

            throw new RedirectException(`${config.get<string>('authentication.errorRoute')}?google`);
        }
        return user;
    }
}
