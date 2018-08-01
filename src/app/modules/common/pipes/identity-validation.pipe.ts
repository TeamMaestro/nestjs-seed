import { PipeTransform, Injectable } from '@nestjs/common';
import { Validator } from 'class-validator';

import { ValidationException } from '../exceptions';

@Injectable()
export class IdentityValidationPipe implements PipeTransform<string> {
    async transform(value: string) {
        const validator = new Validator();
        if (!validator.isUUID(value)) {
            throw new ValidationException('invalid uuid in url param');
        }
        return value;
    }
}
