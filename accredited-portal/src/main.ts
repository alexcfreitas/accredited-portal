import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Portal Credenciados Template')
      .setDescription('Teste Template Descrição')
      .build(),
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  // app.setGlobalPrefix('v1');
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
