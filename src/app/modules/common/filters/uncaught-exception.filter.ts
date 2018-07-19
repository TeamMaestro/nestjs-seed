import * as Raven from 'raven';
import * as config from 'config';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class UncaughtExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse();
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

        res.status(statusCode).json({
            message,
            statusCode,
        });
    }
}
