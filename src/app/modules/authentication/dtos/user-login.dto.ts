import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    constructor(payload = {} as UserLoginDto) {
        this.email = payload.email;
        this.password = payload.password;
    }
}
