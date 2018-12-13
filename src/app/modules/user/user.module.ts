import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserProviders } from './providers/user.providers';
import { UserService } from './services/user/user.service';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        ...UserProviders,
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
