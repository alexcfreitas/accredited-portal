import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthExceptModule } from './module/authexcept.module';
import { AuthModule } from './module/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import KeycloakModule, {
  AuthGuard,
  ResourceGuard,
} from 'nestjs-keycloak-admin';
import configuration from './config/configuration';
import { UserGroupModule } from './module/user-group.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { TransformInterceptor } from './shared/transform.interceptor';
import { GrupoCredenciadoModule } from './module/grupo.credenciado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      connectString: `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DATABASE}`,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    KeycloakModule.registerAsync({
      useFactory: () => {
        const keycloakConfig = JSON.parse(process.env.KEYCLOAK_JSON);
        return {
          baseUrl: keycloakConfig['auth-server-url'],
          realmName: keycloakConfig['realm'],
          clientId: keycloakConfig['resource'],
          clientSecret: keycloakConfig['credentials']['secret'],
        };
      },
    }),
    AuthExceptModule,
    AuthModule,
    UserGroupModule,
    GrupoCredenciadoModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_FILTER, useClass: HttpErrorFilter },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
  ],
})
export class AppModule {}
