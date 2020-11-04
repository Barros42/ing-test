import redis from 'redis'
import { ICacheRepository } from 'src/business/cache/interfaces/cache.repository';
import { promisify } from 'util';

export default class RedisRepository implements ICacheRepository {

    private readonly redisClient: redis.RedisClient
    private currentValue: string
    private getAsync

    constructor(){
        this.redisClient = redis.createClient(parseInt(process.env.REDIS_PORT), process.env.REDIS_HOST, { password: process.env.REDIS_PASSWORD })
        this.getAsync = promisify(this.redisClient.get).bind(this.redisClient);
    }

    async insertValue(key: string, value: string): Promise<void> {
        this.redisClient.SET(key, value);
    }

    async getValue(key: string): Promise<string | null> {
        return await this.getAsync(key)
    }

}
