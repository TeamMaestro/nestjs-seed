import { Component, Inject } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { Model } from 'sequelize-typescript';
import { User } from './user.entity';
import { SQLException } from '../common/exceptions';
import { ApplicationTokens } from '../application-tokens.const';

@Component()
export class UserService {
    constructor(
        @Inject(ApplicationTokens.UserRepositoryToken) private readonly userRepository: typeof Model) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.firstName = createUserDto.firstName;
        user.email = createUserDto.email;
        user.age = createUserDto.age;

        try {
            return await user.save();
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.findAll<User>();
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async findOne(identity: string): Promise<User> {
        try {
            return await this.userRepository.findOne<User>({ where: { id: 1 } });
        }
        catch (error) {
            throw new SQLException(error);
        }
    }
}
