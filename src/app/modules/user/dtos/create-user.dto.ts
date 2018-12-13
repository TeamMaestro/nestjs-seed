import { IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    constructor(payload = {} as CreateUserDto) {
        this.email = payload.email;
        this.password = payload.password;
        this.firstName = payload.firstName;
        this.lastName = payload.lastName;
    }
}
