import * as config from 'config';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { PassiveException } from '../exceptions/passive.exception';

@Catch(PassiveException)
export class PassiveHttpExceptionFilter implements ExceptionFilter {
    catch(exception: PassiveException, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse();

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
