import { ApplicationTokens } from '../../../application-tokens.const';
import { User } from '../entities/user.entity';

export const UserProviders = [{
    provide: ApplicationTokens.UserRepositoryToken,
    useValue: User
}];
