import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    modules: [DatabaseModule],
    controllers: [UserController],
    components: [
        UserService,
        ...UserProviders,
    ],
})
export class UserModule { }
