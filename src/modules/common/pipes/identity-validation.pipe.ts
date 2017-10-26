import { HttpException } from '@nestjs/core';
import { PipeTransform, Pipe, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { IsUUID, Validator } from 'class-validator';

@Pipe()
export class IdentityValidationPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const validator = new Validator();
        if (!validator.isUUID(value)) {
            throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
        }
        return value;
    }

}
