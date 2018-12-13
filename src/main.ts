import { NestFactory } from '@nestjs/core';
import { ExpressHttpLogger } from '@teamhive/express-http-logger';
import { HoneyFlowClient } from '@teamhive/honeyflow-express-client';
import { CookieToBearer, LoggedHttpExceptionFilter, PassiveHttpExceptionFilter, RedirectHttpExceptionFilter, UncaughtExceptionFilter, ValidationPipe } from '@teamhive/nestjs-common';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as log4js from 'log4js';
import * as passport from 'passport';
import * as Raven from 'raven';
import { ApplicationModule } from './app/app.module';
import { ApplicationTokens } from './app/application-tokens.const';
import { CommonModule } from './app/modules/common/common.module';
import { CoreModule } from './app/modules/core/core.module';

async function bootstrap() {
    const consoleLogger = log4js.getLogger();

    try {
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
            commonModule.get(RedirectHttpExceptionFilter),
            commonModule.get(LoggedHttpExceptionFilter)
        );

        // Global nest setup
        app.useGlobalPipes(new ValidationPipe());
        app.setGlobalPrefix(config.get<string>('application.apiPrefix'));

        // Added security
        app.use(helmet());

        // Body parser
        app.use(bodyParser.json({ limit: config.get('application.bodyParserLimit') }));
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(cookieParser());

        // Passport
        app.use(passport.initialize());

        // Pull Jwts off the cookies and set as the bearer token
        app.use(CookieToBearer);

        // HoneyFlow client
        app.use(new HoneyFlowClient({
            apiKey: config.get<string>('honeyflow.apiKey'), // get an apiKey for the project
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

        await app.listen(config.get<number>('application.port'));

        consoleLogger.info(`Server started on port ${config.get('application.port')}`);
        consoleLogger.info(`We are currently in ${config.util.getEnv('NODE_ENV')} mode.`);
    }
    catch (error) {
        consoleLogger.error('Error starting server', error);
        process.exit();
    }
}
bootstrap();
