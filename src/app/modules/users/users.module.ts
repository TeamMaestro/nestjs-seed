import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UsersProviders } from './providers/users.providers';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule
    ],
    controllers: [
        UsersController
    ],
    providers: [
        UsersService,
        ...UsersProviders,
    ],
    exports: [
        UsersService
    ]
})
export class UsersModule { }
