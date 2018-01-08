import { HttpException } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
    constructor() {
        super('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
}
