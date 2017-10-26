// lib
import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
// app
import { UserModule } from './users/user.module';
import { UserController } from './users/user.controller';

@Module({
    modules: [
        AuthenticationModule,
        UserModule
    ],
})
export class ApplicationModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {

        /*
         *  Adding middleware for ensure that the UserController routes
         *  validate through the password jwt strategy
         */
        consumer.apply(passport.authenticate('jwt', { session: false })).forRoutes(UserController);
    }
}
