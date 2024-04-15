import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-validator';
import { BlogEnv } from './blog-env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      validate,
      isGlobal: true,
    }),
  ],
  providers: [BlogEnv],
  exports: [BlogEnv],
})
export class BlogEnvModule {}
