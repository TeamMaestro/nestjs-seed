import { Module } from '@nestjs/common';

import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users';
import { CoreModule } from './modules/core';
import { CommonModule } from './modules/common/common.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';

@Module({
    imports: [
        CommonModule,
        CoreModule,
        ConfigurationModule,
        AuthenticationModule,
        UsersModule
    ]
})
export class ApplicationModule {}
