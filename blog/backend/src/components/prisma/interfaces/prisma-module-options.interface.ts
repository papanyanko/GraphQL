import { ModuleMetadata, Type } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const PRISMA_SERVICE_OPTIONS = 'PRISMA_SERVICE_OPTIONS';
export const PRISMA_EXPLICIT_CONNECT = 'PRISMA_EXPLICIT_CONNECT';

export interface PrismaModuleOptions {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;

  prismaClientOptions?: PrismaClientOptions;
}

export interface PrismaClientOptions {
  /**
   * Pass options directly to the `PrismaClient`.
   * See: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient
   */
  prismaOptions?: Prisma.PrismaClientOptions;

  /**
   * If "true", `PrismaClient` explicitly creates a connection pool and your first query will respond instantly.
   *
   * For most use cases the lazy connect behavior of `PrismaClient` will do. The first query of `PrismaClient` creates the connection pool.
   * See: https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
   */
  // explicitConnect?: boolean;
}

export interface PrismaOptionsFactory {
  createPrismaOptions(): Promise<PrismaClientOptions> | PrismaClientOptions;
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<PrismaOptionsFactory>;
  useClass?: Type<PrismaOptionsFactory>;
  useFactory?: (...args: any[]) => PrismaClientOptions;
  inject?: any[];
}
