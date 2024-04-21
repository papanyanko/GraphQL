import { NestFactory } from '@nestjs/core';
import { BlogEnv } from './config/environments/blog-env.service';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from './components/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const winstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(winstonLogger);
  const blogEnv = app.get(BlogEnv);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableLogger(winstonLogger);
  prismaService.enableShutdownHooks(app);

  await app.listen(blogEnv.Port, '0.0.0.0');
  winstonLogger.log(`PORT: ${blogEnv.Port}`);
}
bootstrap();
