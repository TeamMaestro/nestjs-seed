import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';

@Module({
    components: [...DatabaseProviders],
    exports: [...DatabaseProviders],
})
export class DatabaseModule { }
