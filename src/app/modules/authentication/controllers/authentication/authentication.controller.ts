import { Controller, Post, HttpStatus, HttpCode, Body, UseInterceptors } from '@nestjs/common';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserLoginDto } from '../../dtos/user-login.dto';
import { CreateUserDto, UsersService } from '../../../users';
import { LoggingInterceptor } from '../../../core';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly usersService: UsersService
    ) {}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<{ identity: string }> {
        return await this.usersService.create(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() userCredentials: UserLoginDto) {
        return await this.authenticationService.login(userCredentials);
    }
}
