import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { static as expose } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(expose('public'));
  await app.listen(3000);
}
bootstrap();
