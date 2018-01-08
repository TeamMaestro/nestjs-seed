import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserLoginDto } from './user-login.dto';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken() {
        return await this.authenticationService.createToken();
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    public async login( @Body() userCredentials: UserLoginDto) {
        return await this.authenticationService.login(userCredentials);
    }

}
