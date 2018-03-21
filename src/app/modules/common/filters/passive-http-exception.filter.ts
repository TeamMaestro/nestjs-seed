import * as express from 'express';
import * as config from 'config';
import { ExceptionFilter, Catch } from '@nestjs/common';

import { PassiveException } from '../exceptions/passive.exception';

@Catch(PassiveException)
export class PassiveHttpExceptionFilter implements ExceptionFilter {
    catch(exception: PassiveException, response: express.Response) {
        const appName = config.get<string>('application.name').toUpperCase();
        const exceptionResponse = String(exception.getResponse()).toUpperCase();
        const message = `${appName}_${exceptionResponse}_INVALID`;

        const statusCode = exception.getStatus() || 500;
        response.status(statusCode).json({
            message,
            statusCode,
        });
    }
}
