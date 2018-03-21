import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class NotFoundException extends PassiveException {
    constructor(error?: any) {
        super(
            'NotFound',
            HttpStatus.NOT_FOUND,
            error
        );
    }
}
