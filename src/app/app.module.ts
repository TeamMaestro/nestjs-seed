import { Module } from '@nestjs/common';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { CommonModule } from './modules/common/common.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { CoreModule } from './modules/core';
import { UserModule } from './modules/user';

@Module({
    imports: [
        CommonModule,
        CoreModule,
        ConfigurationModule,
        AuthenticationModule,
        UserModule
    ]
})
export class ApplicationModule {}
