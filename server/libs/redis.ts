import Redis, { RedisOptions } from 'ioredis';
import { envVars } from '../config';

const redisOptions: RedisOptions = {
  host: envVars.redis.host,
  port: parseInt(envVars.redis.port, 10),
  password: envVars.redis.password,
  retryStrategy: (times: number) => Math.min(times * 50, 10000),
};

const redisLazyOptions: RedisOptions = {
  ...redisOptions,
  lazyConnect: false,
  autoResubscribe: false,
  maxRetriesPerRequest: 0,
  retryStrategy: () => null,
};

const redis = new Redis(envVars.prod ? redisOptions : redisLazyOptions);

export default redis;
