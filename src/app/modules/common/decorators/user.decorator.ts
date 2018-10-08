import { createParamDecorator } from '@nestjs/common';
import { AuthorizedUser } from '../../users';

export const User = createParamDecorator((_data, req): AuthorizedUser => {
    return req.user || {} as AuthorizedUser;
});
