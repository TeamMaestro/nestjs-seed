import * as log from 'log4js';
import * as express from 'express';
import { Injectable, NestInterceptor, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationTokens } from '../../../application-tokens.const';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject(ApplicationTokens.LoggerToken)
        private readonly logger: log.Logger
    ) {}

    intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
        const req: express.Request = context.switchToHttp().getRequest();

        const startTime = Date.now();
        let message = ``;
        if (req) {
            message = `${req.method}: ${req.originalUrl}`;
        }
        this.logger.info(message);

        return call$.pipe(
            tap(() => this.logger.info(`${message} took ${Date.now() - startTime}ms`))
        );
    }
}
