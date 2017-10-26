import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserLoginDto } from './user-login.dto';
import { UnauthorizedException } from '../common/exceptions/unauthorized.exception';

@Component()
export class AuthenticationService {
    constructor(private readonly usersService: UserService) { }

    async login(userCredentials: UserLoginDto) {
        const expiresIn = config.get<number>('expiration');
        const secretOrKey = config.get<string>('secret');
        const user = await this.usersService.findOne(userCredentials.username);
        if (user) {
            const tempReqUser = { email: user.email };
            const token = jwt.sign(tempReqUser, secretOrKey, { expiresIn });
            return {
                expires_in: expiresIn,
                access_token: token,
            };
        } else {
            throw new UnauthorizedException();
        }
    }

    async createToken() {
        const expiresIn = config.get<number>('expiration');
        const secretOrKey = config.get<string>('secret');
        const user = { email: 'thisis@example.com' };
        const token = jwt.sign(user, secretOrKey, { expiresIn });
        return {
            expires_in: expiresIn,
            access_token: token,
        };
    }

    async validateUser(signedUser): Promise<boolean> {

        // put some validation logic here
        // for example query user by id / email / username

        return true;
    }
}
