import * as Raven from 'raven';
import * as config from 'config';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';


import { LoggedException } from '../exceptions/logged.exception';

@Catch(LoggedException)
export class LoggedHttpExceptionFilter implements ExceptionFilter {
    catch(exception: LoggedException, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse();

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
        res.status(statusCode).json({
            message,
            statusCode
        });
    }
}
