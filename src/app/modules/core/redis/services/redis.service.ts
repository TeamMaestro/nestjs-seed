import * as redis from 'redis';
import { Injectable, Inject } from '@nestjs/common';

import { ApplicationTokens } from '../../../../application-tokens.const';
import { RedisException } from '../../../common/exceptions/redis.exception';

@Injectable()
export class RedisService {
    constructor(
        @Inject(ApplicationTokens.RedisClientToken)
        private readonly client: redis.RedisClient
    ) {
        // tslint:disable
        this.client.on('error', (err) => console.error(`Error: ${err}`));
        this.client.on('ready', () => console.log('Connected to Redis'));
        this.client.on('reconnecting', () => console.log('Attempting to reconnect to Redis...'));
        // tslint:enable
    }

    getValue(key: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.client.get(key, async (error, response) => {
                if (error) {
                    return reject(error);
                }

                let parsedResponse;
                try {
                    parsedResponse = JSON.parse(response);
                }
                catch (error) {
                    reject(error);
                }

                return resolve(parsedResponse);
            });
        });
    }

    setValue(key: string, value: any, duration?: number): Promise<void> {
        return new Promise<any>((resolve, reject) => {
            if (duration) {
                this.client.set(key, JSON.stringify(value), 'EX', duration, (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
            }
            else {
                this.client.set(key, JSON.stringify(value), (err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
            }
        });
    }

    async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
        }
        catch (error) {
            throw new RedisException(error);
        }
    }
}
