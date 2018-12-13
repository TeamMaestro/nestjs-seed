import { Module } from '@nestjs/common';
import { ErrorHandler, LoggerProvider, RedisProvider, RedisService } from '@teamhive/nestjs-common';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ErrorHandler,
        LoggerProvider,
        RedisService,
        RedisProvider
    ],
    exports: [
        DatabaseModule,
        ErrorHandler,
        LoggerProvider,
        RedisService,
    ]
})
export class CoreModule {}
