import { session } from '@local/keys';
import { Injectable } from '@nestjs/common';
import { TryCatch, UnauthorizedException } from '@teamhive/nestjs-common';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { AuthorizedUser, UserService } from '../../../user';
import { UserLoginDto } from '../../dtos/user-login.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UserService) { }

    @TryCatch(UnauthorizedException)
    async login(userCredentials: UserLoginDto) {

        const user = await this.userService.fetchByEmail(userCredentials.email);

        const isValidPassword = await user.comparePassword(userCredentials.password);

        if (!user || !isValidPassword) {
            throw new UnauthorizedException();
        }

        return this.createTokens(user);
    }

    createTokens(user: AuthorizedUser) {
        const accessToken = this.createAccessToken(user);

        // Get expiration time in seconds
        const accessExpiration = config.get<number>('authentication.session.accessExpiration');
        const expirationTime = new Date(Math.floor((new Date().getTime()) + accessExpiration)).toISOString();

        return {
            accessToken,
            expirationTime,
            redisKey: `${config.get<number>('redis.keyPrefix')}${user.identity}`
        };
    }

    createAccessToken(user: AuthorizedUser) {
        const privateKey = session.private;
        const accessExpiration = config.get<number>('authentication.session.accessExpiration');

        return jwt.sign(
            {
                u_id: user.identity
            },
            privateKey,
            {
                algorithm: 'RS256',
                expiresIn: accessExpiration / 1000
            }

        );
    }
}
