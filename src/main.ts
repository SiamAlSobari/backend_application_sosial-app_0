import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useStaticAssets(join(__dirname, '..', 'upload'),{
    prefix: '/upload'
  });
  app.use(cookieParser())
  app.enableCors({
    origin: ['http://localhost:3000','http://172.19.208.118:8081'],
    credentials: true,
  });
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();