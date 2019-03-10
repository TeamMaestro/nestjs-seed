import { Injectable } from '@nestjs/common';
import { ErrorHandler, RedirectException, PassportAuthGuard } from '@teamhive/nestjs-common';
import * as config from 'config';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';

@Injectable()
export class GoogleAuthGuard extends PassportAuthGuard(PassportStrategyTokens.GoogleStrategy) {
    constructor(
        private readonly errorHandler: ErrorHandler
    ) {
        super();
    }

    handleErrors(error: Error) {
        this.errorHandler.captureException(error);
    }

    throwException() {
        throw new RedirectException(`${config.get<string>('authentication.errorRoute')}?google`);
    }
}
