import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8001);
  console.log(`Auth server is running on: ${await app.getUrl()}`);
}
bootstrap();
