import * as config from 'config';
import * as redis from 'redis';
import * as bluebird from 'bluebird';
import * as Redis from 'connect-redis';
import * as session from 'express-session';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export const client = bluebird.promisifyAll(redis.createClient(config.get<object>('redis'))) as redis.RedisClient;
/* tslint:disable */
client.on('error', (err) => console.error(`Error: ${err}`));
client.on('ready', () => console.log('Connected to Redis'));
client.on('reconnecting', () => console.log('Attempting to reconnect to Redis...'));
/* tslint:enabled */

const RedisStore = Redis(session);

export const redisStore = new RedisStore(Object.assign({}, config.get('redis'), { client }));
