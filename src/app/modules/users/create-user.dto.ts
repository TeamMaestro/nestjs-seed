import { IsString, IsInt } from 'class-validator';

export class CreateUserDto {
    @IsInt()
    readonly age: number;

    @IsString()
    readonly email: string;

    @IsString()
    readonly firstName: string;
}
