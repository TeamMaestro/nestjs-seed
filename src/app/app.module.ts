import { Module } from '@nestjs/common';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users';
import { CoreModule } from './modules/core';
import { CommonModule } from './modules/common/common.module';

@Module({
    modules: [
        CommonModule,
        CoreModule,
        AuthenticationModule,
        UsersModule
    ]
})
export class ApplicationModule {}
