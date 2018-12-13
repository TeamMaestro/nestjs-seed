import { ApplicationTokens as ApplicationTokensCommon } from '@teamhive/nestjs-common';

export const ApplicationTokens = {
    ...ApplicationTokensCommon,
    SequelizeToken: 'SequelizeToken',
    UserRepositoryToken: 'UserRepositoryToken'
};
