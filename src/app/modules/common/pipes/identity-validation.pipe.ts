import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus, HttpException } from '@nestjs/common';
import { Validator } from 'class-validator';

@Injectable()
export class IdentityValidationPipe implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const validator = new Validator();
        if (!validator.isUUID(value)) {
            throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
