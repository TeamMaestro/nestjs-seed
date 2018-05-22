import * as log from 'log4js';
import * as config from 'config';
import { ApplicationTokens } from '../../../application-tokens.const';

export const LoggerProvider = {
    provide: ApplicationTokens.LoggerToken,
    useFactory: async () => {
        const logger = log.getLogger();
        logger.level = config.get('logger.level');

        return logger;
    },
};
