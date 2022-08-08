import Redis, {type RedisOptions} from "ioredis";
import {type AsyncStorage} from "mtproto-shared";

export class RedisStorage implements AsyncStorage {
    redis: Redis;
    hash: string;

    constructor(
        hash: string,
        redisOptions: RedisOptions,
        redisInstance?: Redis
    ) {
        this.hash = hash
        this.redis = redisInstance || new Redis(redisOptions);
    }

    async get(key: string): Promise<any> {
        const val = await this.redis.hget(this.hash, key);
        // @ts-ignore
        return JSON.parse(val);
    };

    async set(key: string, val: any): Promise<void> {
        await this.redis.hset(this.hash, key, JSON.stringify(val))
    }

    async has(key: string): Promise<boolean> {
        const exists: number = await this.redis.hexists(this.hash, key)
        return !!exists
    }

    async remove(...keys: string[]): Promise<void> {
        await this.redis.hdel(this.hash, ...keys)
    }

    async clear(): Promise<void> {
        await this.redis.del(this.hash)
    }
}

export {RedisStorage as Storage}

export default RedisStorage