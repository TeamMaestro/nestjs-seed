import * as config from 'config';
import * as log4js from 'log4js';
import * as pg from 'pg';
import { Sequelize } from 'sequelize-typescript';
import { ApplicationTokens } from '../../../application-tokens.const';
import { User } from '../../user/entities/user.entity';

/*
 * This is required to convert `timestamp without time zones` to UTC time
 * when extracting them from the DB and then being casted with Sequelize
 */
pg.types.setTypeParser(1114, (stringValue) => {
    return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + 'Z');
});
/*******/

const logger = log4js.getLogger('SQL');

export const DatabaseProvider = {
    provide: ApplicationTokens.SequelizeToken,
    useFactory: () => {
        const sequelize = new Sequelize({ ...config.get('database'), logging: (log) => logger.info(log) });

        sequelize.addModels([
            User
        ]);

        return sequelize;
    }
};
