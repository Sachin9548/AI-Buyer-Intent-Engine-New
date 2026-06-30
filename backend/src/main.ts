import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.enableCors({
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: false, 
  allowedHeaders: 'Content-Type, Accept',
});
  app.useGlobalPipes(new ValidationPipe()); 
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();