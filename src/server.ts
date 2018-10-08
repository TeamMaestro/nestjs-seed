// lib
import * as Raven from 'raven';
import * as helmet from 'helmet';
import * as config from 'config';
import * as passport from 'passport';
import * as session from 'express-session';
import * as _ from 'lodash';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ExpressHttpLogger } from '@teamhive/express-http-logger';
import { HoneyFlowClient } from '@teamhive/honeyflow-express-client';

// app
import { RedisModule } from './app/modules/core/redis/redis.module';
import { ApplicationModule } from './app/app.module';
import { ValidationPipe } from './app/modules/common/pipes/validation.pipe';
import { CoreModule } from './app/modules/core/core.module';
import { CommonModule } from './app/modules/common/common.module';
import {
    PassiveHttpExceptionFilter,
    LoggedHttpExceptionFilter,
    UncaughtExceptionFilter
} from './app/modules/common/filters';
import { ApplicationTokens } from './app/application-tokens.const';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    // Raven
    if (process.env.DEPLOYMENT) {
        Raven.config(config.get<string>('raven.dsn'), {
            release: process.env.npm_package_version,
            environment: config.util.getEnv('NODE_ENV')
        }).install();

        app.use(Raven['requestHandler']());
    }

    // Error handlers
    const commonModule = app.select(CommonModule);
    app.useGlobalFilters(
        commonModule.get(UncaughtExceptionFilter),
        commonModule.get(PassiveHttpExceptionFilter),
        commonModule.get(LoggedHttpExceptionFilter)
    );

    // Global nest setup
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('/api');

    // Added security
    app.use(helmet());

    // Body parser
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false }));

    // Redis
    const redisModule = app.select(RedisModule);

    app.use(cookieParser(config.get<string>('session.secret')));
    app.use(session(_.merge({
        store: redisModule.get(ApplicationTokens.RedisStoreToken)
    }, config.get<session.SessionOptions>('session'))));

    // Passport
    app.use(passport.initialize());
    app.use(passport.session());

    // HoneyFlow client
    app.use(new HoneyFlowClient({
        apiKey: 'ebb58d01-08a6-42c6-a04e-b7f3516aaca1', // get an apiKey for the project
        host: 'http://localhost:8000',
        environment: process.env.NODE_ENV,
        release: process.env.npm_package_version,
        ignoreEndpoints: [{
            route: '/versions',
            methods: ['GET']
        }],
        sampleRate: 1
    }).monitor());

    // Endpoint logging
    const coreModule = app.select(CoreModule);
    app.use(new ExpressHttpLogger(coreModule.get(ApplicationTokens.LoggerToken)).log());

    // Start server
    try {
        await app.listen(config.get<number>('port'));
        /* tslint:disable */
        console.log('Server started on port ' + config.get('port'));
        console.log('We are currently in ' + config.util.getEnv('NODE_ENV') + ' mode.');
        /* tslint:enabled */
    }
    catch (error) {
        /* tslint:disable */
        console.log('Error starting server ' + error);
        /* tslint:enabled */
    }
}
bootstrap();
