import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class BadRequestException extends PassiveException {
    constructor(message?: any) {
        super(
            message || 'Bad Request',
            HttpStatus.BAD_REQUEST
        );
    }
}
