import { Module } from '@nestjs/common';
import { LoggedHttpExceptionFilter } from './filters/logged-http-exception.filter';
import { PassiveHttpExceptionFilter } from './filters/passive-http-exception.filter';
import { UncaughtExceptionFilter } from './filters/uncaught-exception.filter';

@Module({
    components: [
        LoggedHttpExceptionFilter,
        PassiveHttpExceptionFilter,
        UncaughtExceptionFilter
    ]
})
export class CommonModule {}
