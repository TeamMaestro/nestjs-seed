import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { Profile } from 'passport-google-oauth';

import { ApplicationTokens } from '../../../../application-tokens.const';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { SQLException } from '../../../common/exceptions';

@Injectable()
export class UsersService {
    constructor(
        @Inject(ApplicationTokens.UserRepositoryToken)
        private readonly userRepository: typeof Model
    ) {}

    async create(createUserDto: CreateUserDto): Promise<{ identity: string }> {
        try {
            const user = await this.userRepository.create<User>(createUserDto);
            return { identity: user.identity };
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async fetchAll(): Promise<User[]> {
        try {
            return await this.userRepository.findAll<User>();
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async fetchByEmail(email: string): Promise<User> {
        try {
            return await this.userRepository.findOne<User>({ where: { email } });
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async fetchByIdentity(identity: string): Promise<User> {
        try {
            return await this.userRepository.findOne<User>({ where: { identity } });
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async fetchFromGoogle(profile: Profile): Promise<User> {
        try {
            return await this.userRepository.findOne<User>({
                where: {
                    provider: profile.provider,
                    providerId: profile.id,
                }
            });
        }
        catch (error) {
            throw new SQLException(error);
        }
    }

    async createFromGoogle(profile: Profile): Promise<User> {
        const user = new User();

        if (profile.name) {
            user.firstName = profile.name.givenName;
            user.lastName = profile.name.familyName;
        }
        if (profile.emails && profile.emails.length > 0) {
            user.email = profile.emails[0].value;
        }
        if (profile.photos && profile.photos.length > 0) {
            user.avatar = profile.photos[0].value;
        }
        if (profile.provider) {
            user.provider = profile.provider;
            user.providerId = profile.id;
        }

        try {
            return await user.save();
        }
        catch (error) {
            throw new SQLException(error);
        }
    }
}
