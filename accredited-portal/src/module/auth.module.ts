// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ResourceService } from '../service/resource.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: parseInt(process.env.HTTP_REQUEST_TIMEOUT),
        maxRedirects: parseInt(process.env.HTTP_REQUEST_MAX_REDIRECTS),
      }),
    }),
    JwtModule.register({
      publicKey: process.env.JWT_KEYCLOAK_PUBLIC_KEY,
    }),
  ],
  providers: [AuthService, ResourceService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
