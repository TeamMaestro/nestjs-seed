import { BaseException } from './base.exception';

export abstract class PassiveException extends BaseException {
    constructor(response: string | object, status: number, error?: Error) {
        super(response, status, error);
    }
}
