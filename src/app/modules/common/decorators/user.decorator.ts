import { createRouteParamDecorator } from '@nestjs/common';
import { Profile } from 'passport';

export const User = createRouteParamDecorator((data, req): Profile => {
    return req.user || {} as Profile;
});
