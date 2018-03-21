import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class ValidationException extends PassiveException {
    constructor(error?: any) {
        super(
            'Unauthorized',
            HttpStatus.BAD_REQUEST,
            error
        );
    }
}
