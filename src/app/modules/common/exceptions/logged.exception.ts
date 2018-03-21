import { BaseException } from './base.exception';

export abstract class LoggedException extends BaseException {
    constructor(response: string | object, status: number, error?: Error) {
        super(response, status, error);
    }
}
