import * as Sequelize from 'sequelize';
import { HttpStatus } from '@nestjs/common';

import { LoggedException } from './logged.exception';

export class SQLException extends LoggedException {
    constructor(error: Sequelize.BaseError) {
        super(
            'Internal Server Error - SQL',
            HttpStatus.INTERNAL_SERVER_ERROR,
            error
        );
    }
}
