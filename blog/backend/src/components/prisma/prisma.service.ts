import {
  Inject,
  Injectable,
  LoggerService,
  OnModuleInit,
  Optional,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  PrismaClientOptions,
  PRISMA_SERVICE_OPTIONS,
} from './interfaces/prisma-module-options.interface';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'info' | 'query' | 'warn'>
  implements OnModuleInit
{
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private readonly prismaClientOptions: PrismaClientOptions = {},
  ) {
    super(prismaClientOptions.prismaOptions);
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableLogger(logger: LoggerService) {
    this.$on('query', (e) => {
      logger.debug(e);
    });

    this.$on('info', (e) => {
      logger.log(e);
    });

    this.$on('warn', (e) => {
      logger.log(e);
    });
  }
}
