import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(private readonly redis: Redis) {}

  async get(key: string): Promise<any> {
    return this.redis.get(key);
  }

  async set(key: string, value: string): Promise<any> {
    return await this.redis.set(key, value);
  }
}
