import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    Response,
    UseGuards
    } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedisService, User } from '@teamhive/nestjs-common';
import * as config from 'config';
import * as express from 'express';
import { PassportStrategyTokens } from '../../../../passport-strategy-tokens.const';
import { AuthorizedUser, CreateUserDto, UserService } from '../../../user';
import { UserLoginDto } from '../../dtos/user-login.dto';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Controller()
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UserService,
        private readonly redisService: RedisService
    ) {}

    @Get('authentication/google')
    @UseGuards(AuthGuard(PassportStrategyTokens.GoogleStrategy))
    googleOAuth() {
        // initiates the Google OAuth2 login flow
    }

    /**
     *
     * @param _res -- need the response object so that nest doesn't automatically return,
     *               setting the headers for a second time, after passport middleware did
     */
    @UseGuards(AuthGuard(PassportStrategyTokens.GoogleStrategy))
    @Get('auth/google/callback')
    async googleCallback(
        @User() user: AuthorizedUser,
        @Response() res: express.Response
    ) {
        // Generate Auth Tokens
        const tokens = this.authenticationService.createTokens(user);

        // Store a User Cache in Redis
        await this.redisService.setValue(
            tokens.redisKey,
            user,
            config.get<number>('redis.expiration')
        );

        // Generate an Auth Cookie
        res.cookie(
            config.get<string>('authentication.session.accessCookie.name'),
            tokens.accessToken,
            config.get('authentication.session.accessCookie.options')
        );

        // Redirect to the Auth Success Route
        res.redirect(`${config.get<string>('authentication.successRoute')}`);
    }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userCredentials: UserLoginDto) {
        return await this.authenticationService.login(userCredentials);
    }

    /**
     * @api {get} /api/v1/authentication/logout Logout
     * @apiVersion 0.0.1
     * @apiName AuthLogout
     * @apiDescription You will redirect the user to this endpoint
     *  which will clear the cookies and redirect back to the main auth screen
     * @apiGroup Authentication
     *
     * @apiParam (Request-Query) {String} [redirect] The path that we are suppose to redirect to
     *
     */
    @Get('logout')
    logout(
        @Request() req: express.Request,
        @Response() res: express.Response
    ) {
        // Expire the cookie
        res.cookie(
            config.get<string>('authentication.session.accessCookie.name'),
            '',
            { expires: new Date() }
        );

        // Redirect
        const redirect = (req.query['redirect']) ? `?redirect=${req.query['redirect']}` : '';
        res.redirect(`${config.get<string>('authentication.authenticationRoute')}${redirect}`);
    }
}
