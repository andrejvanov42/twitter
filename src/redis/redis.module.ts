import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
})
export class RedisModule {
  static forRoot(arg0: {
    config: { host: string; port: number; password: string };
  }):
    | import('@nestjs/common').Type<any>
    | import('@nestjs/common').DynamicModule
    | Promise<import('@nestjs/common').DynamicModule>
    | import('@nestjs/common').ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
}
