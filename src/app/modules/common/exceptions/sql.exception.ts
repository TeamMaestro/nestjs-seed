import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';
import * as Sequelize from 'sequelize';

export class SQLException extends HttpException {
    constructor(error: Sequelize.BaseError) {

        // tslint:disable-next-line:no-console
        console.error(error);

        super('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
