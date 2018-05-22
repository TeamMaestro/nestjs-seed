import { User } from '../entities/user.entity';
import { ApplicationTokens } from '../../../application-tokens.const';

export const UsersProviders = [{
    provide: ApplicationTokens.UserRepositoryToken,
    useValue: User,
}];
