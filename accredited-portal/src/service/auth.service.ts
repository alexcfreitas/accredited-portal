import * as crypto from 'crypto';

import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from 'src/api-doc/response/auth.response';
import { AuthRequest, TicketForm } from '../api-doc/request/auth.request';
import { ResourceService } from './resource.service';
import { KeycloakService } from 'nestjs-keycloak-admin';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpService,
    private configService: ConfigService<any>,
    private jwt: JwtService,
    private resource: ResourceService,
    private keycloak: KeycloakService,
  ) {}

  data2Token(data: any): any {
    const key = crypto.randomBytes(32).toString('hex');

    const options = {
      secret: key,
    };

    return this.jwt.sign(data, options);
  }

  async getResource(_resourceId: string): Promise<any> {
    return await this.resource.getResource(_resourceId);
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    try {
      const keycloakConfig = this.configService.get<string>('keycloak');

      const keycloakData = await this.keycloak.connect.grantManager.obtainDirectly(
        data['username'],
        data['password'],
      );

      if (keycloakData) {
        throw new Error('Teste erro tal lll');
      }

      const kcData = JSON.parse(keycloakData.toString());
      const decodeToken = this.jwt.decode(kcData['access_token']);

      const { resource } = await this.getResource('');

      enum TicketResponseMode {
        permissions = 'permissions',
        decision = 'decision',
      }
      const paramPermissions: TicketForm = {
        token: kcData['access_token'],
        audience: keycloakConfig['resource'],
        response_mode: TicketResponseMode.permissions,
      };

      const permissionsData = await this.keycloak.permissionManager.requestTicket(
        paramPermissions,
      );

      const permissionsToToken = this.data2Token({
        permissions: permissionsData,
      });

      const resourceToToken = this.data2Token(resource);

      return {
        ...kcData,
        permissions_token: permissionsToToken,
        resource_token: resourceToToken,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async logout(): Promise<void> {
    const keycloak = this.configService.get<string>('keycloak');
    const url = `${keycloak['auth-server-url']}/realms/${keycloak['realm']}/protocol/openid-connect/logout`;
    const response = await this.http.get(url).toPromise();
  }
}
