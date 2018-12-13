import { Module } from '@nestjs/common';
import { LoggedHttpExceptionFilter, PassiveHttpExceptionFilter, RedirectHttpExceptionFilter, UncaughtExceptionFilter } from '@teamhive/nestjs-common';
import { CoreModule } from '../core';

@Module({
    imports: [
        CoreModule
    ],
    providers: [
        LoggedHttpExceptionFilter,
        PassiveHttpExceptionFilter,
        UncaughtExceptionFilter,
        RedirectHttpExceptionFilter
    ]
})
export class CommonModule {}
