import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieSession = require('cookie-session');
import { UserInterceptor } from './interceptors/current-user.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieSession({ secret: 'asdf' }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
