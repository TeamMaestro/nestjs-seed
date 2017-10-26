import { User } from './user.entity';
import { ApplicationTokens } from '../application-tokens.const';

export const UserProviders = [{
    provide: ApplicationTokens.UserRepositoryToken,
    useValue: User,
}];
