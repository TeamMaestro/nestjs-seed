import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { PassiveException } from '../exceptions/passive.exception';

@Catch(PassiveException)
export class PassiveHttpExceptionFilter implements ExceptionFilter {
    catch(exception: PassiveException, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse();

        const statusCode = exception.getStatus() || 500;
        res.status(statusCode).json({
            statusCode,
            appCode: HttpStatus[statusCode],
            message: exception.getResponse()
        });
    }
}
