import * as Raven from 'raven';
import * as express from 'express';
import * as config from 'config';
import { ExceptionFilter, Catch } from '@nestjs/common';

import { LoggedException } from '../exceptions/logged.exception';

@Catch(LoggedException)
export class LoggedHttpExceptionFilter implements ExceptionFilter {
    catch(exception: LoggedException, response: express.Response) {
        // Handle Stack Traces
        if (process.env.DEPLOYMENT) {
            Raven.captureException(exception.error);
        } else {
            // Development Only Console Logging
            // tslint:disable-next-line:no-console
            console.error(exception.error);
        }

        const appName = config.get<string>('application.name').toUpperCase();
        const exceptionResponse = String(exception.getResponse()).toUpperCase();
        const message = `${appName}_${exceptionResponse}_INVALID`;

        const statusCode = exception.getStatus() || 500;
        response.status(statusCode).json({
            message,
            statusCode
        });
    }
}
