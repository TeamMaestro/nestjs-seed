import * as config from 'config';
import * as redis from 'redis';
import * as bluebird from 'bluebird';
import * as Redis from 'connect-redis';
import * as session from 'express-session';

import { ApplicationTokens } from '../../../../application-tokens.const';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const client = bluebird.promisifyAll(redis.createClient(config.get<object>('redis'))) as redis.RedisClient;

const RedisStore = Redis(session);
const redisStore = new RedisStore(Object.assign({}, config.get('redis'), { client }));

export const RedisProviders = [
    {
        provide: ApplicationTokens.RedisClientToken,
        useValue: client
    },
    {
        provide: ApplicationTokens.RedisStoreToken,
        useValue: redisStore
    }
];
