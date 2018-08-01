import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class ValidationException extends PassiveException {
    constructor(message?: string) {
        super(
            message || 'Request format is invalid',
            HttpStatus.BAD_REQUEST
        );
    }
}
