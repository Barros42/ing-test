import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import dotenvFlow = require('dotenv-flow');


async function bootstrap() {
  dotenvFlow.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const options = new DocumentBuilder()
    .setTitle('InGaia')
    .setDescription('InGaia Test Api')
    .setVersion('1.0')
    .addTag('ingaia')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
