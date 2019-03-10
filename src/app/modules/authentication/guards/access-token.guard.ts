import { Injectable } from '@nestjs/common';
import { ErrorHandler, PassportAuthGuard } from '@teamhive/nestjs-common';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';

@Injectable()
export class AccessTokenGuard extends PassportAuthGuard(PassportStrategyTokens.AccessTokenStrategy) {
    constructor(
        private readonly errorHandler: ErrorHandler
    ) {
        super();
    }

    handleErrors(error: Error) {
        this.errorHandler.captureException(error);
    }
}
