import * as log from 'log4js';
import * as express from 'express';
import { Interceptor, NestInterceptor, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ApplicationTokens } from '../../../application-tokens.const';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        @Inject(ApplicationTokens.LoggerToken) private readonly logger: log.Logger
    ) {}

    intercept(request: express.Request, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        const startTime = Date.now();
        let message = ``;
        if (request) {
            message = `${request.method}: ${request.originalUrl}`;
        }
        this.logger.info(message);

        return stream$.do(
            () => this.logger.info(`${message} took ${Date.now() - startTime}ms`)
        );
    }
}
