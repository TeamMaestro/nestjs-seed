import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response) {
        const statusCode = exception.getStatus() || 500;

        const message = 'NESTJS_SEED_' + String(exception.getResponse()).toUpperCase() + '_INVALID';

        response.status(statusCode).json({
            message,
            statusCode,
        });
    }
}
