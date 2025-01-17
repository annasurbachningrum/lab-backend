import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import  * as  cokieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cokieParser());
  app.enableCors({
    origin:"*",
  });

  const config = new DocumentBuilder()
    .setTitle('Latihan Nest JS kelas - C')
    .setDescription('Annas Urbach Ningrum - 105841109022')
    .setVersion('0.1')
    .addTag('Latihan 1')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();