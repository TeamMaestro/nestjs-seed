import { Module } from '@nestjs/common';

import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { UsersModule } from '../users';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule,
        UsersModule
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        AuthenticationService,
        JwtStrategy
    ]
})
export class AuthenticationModule { }
