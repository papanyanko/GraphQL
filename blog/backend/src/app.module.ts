import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WinstonModule } from 'nest-winston';
import { PrismaModule } from './components/prisma/prisma.module';
import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogEnvModule } from './config/environments/blog-env.module';
import { PostsModule } from './components/posts/posts.module';
import { BlogEnv } from './config/environments/blog-env.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      inject: [BlogEnv],
      useFactory: (env: BlogEnv) => env.GqlModuleOptionsFactory,
      driver: ApolloDriver,
    }),
    WinstonModule.forRootAsync({
      inject: [BlogEnv],
      useFactory: (env: BlogEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [BlogEnv],
      isGlobal: true,
      useFactory: (env: BlogEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
    BlogEnvModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
