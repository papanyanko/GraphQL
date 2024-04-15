import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { LoggingWinston } from '@google-cloud/logging-winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import winston from 'winston';
import { Prisma } from '@prisma/client';
import * as path from 'path';

@Injectable()
export class BlogEnv {
  constructor(private configService: ConfigService) {}

  isProduction(): boolean {
    return this.NodeEnv === 'production';
  }

  get GqlModuleOptionsFactory(): GqlModuleOptions {
    const devOptions: GqlModuleOptions = {
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    };

    const prdOptions: GqlModuleOptions = {
      autoSchemaFile: true,
    };

    if (this.isProduction) {
      return prdOptions;
    } else {
      return devOptions;
    }
  }

  get WinstonModuleOptionsFactory(): WinstonModuleOptions {
    const loggingConsole = new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.errors({ stack: true }),
        nestWinstonModuleUtilities.format.nestLike('BLOG_BACKEND', {
          prettyPrint: true,
        }),
      ),
    });
    const loggingCloudLogging = new LoggingWinston({
      serviceContext: {
        service: 'blog-backend',
        version: '1.0.0',
      },
    });
    return {
      level: this.isProduction() ? 'info' : 'debug',
      transports: this.isProduction()
        ? [loggingConsole, loggingCloudLogging]
        : [loggingConsole],
    };
  }

  get PrismaOptionsFactory(): Prisma.PrismaClientOptions {
    const logOptions = {
      development: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      production: [{ emit: 'event', level: 'warn' }],
      test: [
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    };
    return {
      errorFormat: 'colorless',
      log: logOptions[this.NodeEnv],
    };
  }

  get service() {
    return this.configService;
  }

  get NodeEnv(): string {
    return this.configService.get('NODE_ENV');
  }

  get Port(): number {
    return this.configService.get('PORT');
  }

  get DatabaseUrl(): string {
    return this.configService.get('DATABASE_URL');
  }
}
