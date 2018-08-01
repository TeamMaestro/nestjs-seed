import * as Raven from 'raven';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class UncaughtExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse();

        // use 405 instead of 403 do to cloudfront's handling of forbidden
        if (exception.status === HttpStatus.FORBIDDEN) {
            exception.status = HttpStatus.METHOD_NOT_ALLOWED;
        }

        const statusCode = exception.status || 500;

        // Handle Stack Traces
        if (process.env.DEPLOYMENT) {
            Raven.captureException(exception);
        } else {
            // Development Only Console Logging
            // tslint:disable-next-line:no-console
            console.error(exception.stack);
        }

        let message;
        if (exception.message) {
            message = exception.message.error || exception.message;
        }
        else {
            message = 'There was an internal server error';
        }

        res.status(statusCode).json({
            statusCode,
            appCode: HttpStatus[statusCode],
            message
        });
    }
}
