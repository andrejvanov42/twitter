import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<string>('API_PORT');
  const host = config.get<string>('API_HOST');
  await app.listen(port || 3000, () => {
    console.log(`Server has been started on ${port}`);
  });
}
bootstrap();
