import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { LoggerProvider } from './logger/logger.provider';
import { RedisModule } from './redis/redis.module';

@Module({
    imports: [
        DatabaseModule,
        RedisModule
    ],
    providers: [
        LoggerProvider
    ],
    exports: [
        DatabaseModule,
        RedisModule,
        LoggerProvider
    ]
})
export class CoreModule {}
