import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { RedisProviders } from './providers/redis.provider';

@Module({
    providers: [
        RedisService,
        ...RedisProviders
    ],
    exports: [
        RedisService
    ]
})
export class RedisModule {}
