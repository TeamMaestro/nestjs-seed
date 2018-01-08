// lib
import * as fs from 'fs';
import * as path from 'path';
import * as log4js from 'log4js';
import * as helmet from 'helmet';
import * as config from 'config';
import * as favicon from 'serve-favicon';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import validator = require('express-validator');

// app
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from './app/modules/common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    app.use(helmet());

    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe());

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));

    await app.listen(config.get<number>('port'));
}
bootstrap();
