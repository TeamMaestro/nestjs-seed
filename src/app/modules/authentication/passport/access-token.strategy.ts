import * as keystore from '@local/keys';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ErrorHandler, RedisService, UnauthorizedException } from '@teamhive/nestjs-common';
import * as config from 'config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategyTokens } from '../../../passport-strategy-tokens.const';
import { AuthorizedUser } from '../../user/classes/authorized-user';
import { UserService } from '../../user/services/user/user.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, PassportStrategyTokens.AccessTokenStrategy) {
    constructor(
        private readonly userService: UserService,
        private readonly redisService: RedisService,
        private readonly errorHandler: ErrorHandler,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: keystore.session.public,
            algorithms: ['RS256']
        });
    }

    async validate(payload: JwtPayload) {
        if (!payload) {
            throw new UnauthorizedException();
        }

        if (!payload.u_id) {
            throw new UnauthorizedException();
        }

        // get user value from redis
        let storedUser: AuthorizedUser;
        try {
            storedUser = await this.redisService.getValue(`${config.get<number>('redis.keyPrefix')}${payload.u_id}`) as AuthorizedUser;
        }
        catch (error) {
            throw new UnauthorizedException();
        }

        if (storedUser) {
            return storedUser;
        }

        try {
            // if not in redis, getfrom db and store in redis
            const user = await this.userService.fetchByIdentity(payload.u_id);

            // if user not found throw error
            if (!user) {
                throw new UnauthorizedException();
            }

            const authorizedUser = new AuthorizedUser(user);

            // else, set found user in redis
            await this.redisService.setValue(
                `${config.get<number>('redis.keyPrefix')}${user.identity}`,
                authorizedUser,
                config.get<number>('redis.expiration')
            );

            // send authorized user to guard
            return authorizedUser;
        }
        catch (error) {
            this.errorHandler.captureException(error);
            throw new UnauthorizedException();
        }
    }
}
