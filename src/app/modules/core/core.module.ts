import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { LoggerProvider } from './logger/logger.provider';

@Module({
    imports: [
        DatabaseModule
    ],
    providers: [
        LoggerProvider
    ],
    exports: [
        DatabaseModule,
        LoggerProvider
    ]
})
export class CoreModule {}
