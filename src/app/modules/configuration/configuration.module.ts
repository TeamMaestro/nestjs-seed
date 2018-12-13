import { Module } from '@nestjs/common';
import { ConfigurationController } from './controllers/configuration/configuration.controller';

@Module({
    controllers: [
        ConfigurationController
    ]
})
export class ConfigurationModule {}
