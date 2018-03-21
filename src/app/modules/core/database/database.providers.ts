import * as config from 'config';
import * as pg from 'pg';
import { Sequelize } from 'sequelize-typescript';

import { ApplicationTokens } from '../../../application-tokens.const';
import { User } from '../../users/entities/user.entity';

/*
 * This is required to convert `timestamp without time zones` to UTC time
 * when extracting them from the DB and then being casted with Sequelize
 */
pg.types.setTypeParser(1114, (stringValue) => {
    return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + 'Z');
});
/*******/

export const DatabaseProviders = [{
    provide: ApplicationTokens.SequelizeToken,
    useFactory: async () => {
        const sequelize = new Sequelize(config.get('database'));

        sequelize.addModels([
            User
        ]);

        return sequelize;
    }
}];
