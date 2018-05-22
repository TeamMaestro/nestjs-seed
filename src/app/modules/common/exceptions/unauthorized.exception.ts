import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class UnauthorizedException extends PassiveException {
    constructor(error?: any) {
        super(
            'Unauthorized',
            HttpStatus.UNAUTHORIZED,
            error
        );
    }
}
