import { Inject, Injectable } from '@nestjs/common';
import { SqlException, TryCatch } from '@teamhive/nestjs-common';
import { getAttributes } from '@teamhive/sequelize-common';
import { Profile } from 'passport-google-oauth';
import { ApplicationTokens } from '../../../../application-tokens.const';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject(ApplicationTokens.UserRepositoryToken)
        private readonly userRepository: typeof User
    ) {}

    @TryCatch(SqlException)
    async create(createUserDto: CreateUserDto): Promise<{ identity: string }> {
        const user = await this.userRepository.create(createUserDto);
        return { identity: user.identity };
    }

    @TryCatch(SqlException)
    async fetchAll(): Promise<User[]> {
        return await this.userRepository.findAll({
            attributes: getAttributes<User>([
                'identity',
                'firstName',
                'lastName',
                'email',
                'provider',
                'avatar'
            ])
        });
    }

    @TryCatch(SqlException)
    async fetchByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    @TryCatch(SqlException)
    async fetchByIdentity(identity: string): Promise<User> {
        return await this.userRepository.findOne({ where: { identity } });
    }

    @TryCatch(SqlException)
    async fetchFromGoogle(profile: Profile): Promise<User> {
        return await this.userRepository.findOne({
            attributes: getAttributes<User>([
                'identity',
                'firstName',
                'lastName',
                'email'
            ]),
            where: {
                provider: profile.provider,
                providerId: profile.id,
            }
        });
    }

    @TryCatch(SqlException)
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

        return await user.save();
    }
}
