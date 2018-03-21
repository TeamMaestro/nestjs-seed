import { IsString } from 'class-validator';

export class UserLoginDto {
    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}
