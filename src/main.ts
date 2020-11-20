import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.forRoot(), { cors: true });
  const logger = new Logger('DEPARTMENT');

  const options = new DocumentBuilder()
    .setTitle('DEPARTMENT')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    logger.log('Started at http://localhost:3000/api');
  });
}
bootstrap();
