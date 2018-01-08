import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../users/user.service';
import { UserProviders } from '../users/user.providers';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
    components: [
        AuthenticationService,
        JwtStrategy,
        UserService,
        ...UserProviders
    ],
    controllers: [AuthenticationController],
})
export class AuthenticationModule { }
