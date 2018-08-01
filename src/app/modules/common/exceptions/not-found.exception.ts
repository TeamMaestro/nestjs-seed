import { HttpStatus } from '@nestjs/common';

import { PassiveException } from './passive.exception';

export class NotFoundException extends PassiveException {
    constructor(message?: string) {
        super(
            message || 'Item not found',
            HttpStatus.NOT_FOUND
        );
    }
}
