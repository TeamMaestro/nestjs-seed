import { HttpException } from '@nestjs/common';

export abstract class BaseException extends HttpException {
    error: Error;

    constructor(response: string | object, status: number, error?: Error) {
        super(response, status);
        this.error = error;
    }
}
