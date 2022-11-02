import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthResponse } from '../api-doc/response/auth.response';
import { AuthRequest } from '../api-doc/request/auth.request';
import { Public } from 'nestjs-keycloak-admin';

@Controller()
export class AuthController {
  constructor(private serv: AuthService) {}
  @Public()
  @ApiCreatedResponse({
    type: AuthResponse,
  })
  @Post('/login')
  async login(
    @Body()
    body: AuthRequest,
  ): Promise<AuthResponse> {
    return this.serv.login(body);
  }

  @Public()
  @Get('/logout')
  async logout(): Promise<void> {
    return this.serv.logout();
  }
}
