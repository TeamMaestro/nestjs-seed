import * as Raven from 'raven';
import * as express from 'express';
import * as config from 'config';
import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch(Error)
export class UncaughtExceptionFilter implements ExceptionFilter {
    catch(exception: Error, response: express.Response) {
        const statusCode = 500;

        const message = `${config.get<string>('application.name')}_INTERNAL_ERROR`;

        // Handle Stack Traces
        if (process.env.DEPLOYMENT) {
            Raven.captureException(exception);
        } else {
            // Development Only Console Logging
            // tslint:disable-next-line:no-console
            console.error(exception.stack);
        }

        response.status(statusCode).json({
            message,
            statusCode,
        });
    }
}
