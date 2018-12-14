import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { GoogleAuthGaurd } from './guards/google-auth.gaurd';
import { AccessTokenStrategy, GoogleStrategy } from './passport';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CoreModule } from '../core';
import { UserModule } from '../user';

@Module({
    imports: [
        CoreModule,
        UserModule
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        AuthenticationService,
        GoogleStrategy,
        AccessTokenStrategy,
        GoogleAuthGaurd
    ]
})
export class AuthenticationModule { }
