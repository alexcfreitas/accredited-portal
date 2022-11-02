import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  ValidationPipe,
} from '@nestjs/common';
import { AuthExceptService } from '../service/authexcept.service';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthExceptResponse } from '../api-doc/response/authexcept.response';
import { AuthExceptRequest } from '../api-doc/request/authexcept.request';
import { DefineResource, DefineScope } from 'nestjs-keycloak-admin';

@Controller('authexcept')
@DefineResource('authexcept')
export class AuthExceptController {
  constructor(private serv: AuthExceptService) {}

  @Get()
  @DefineScope('visualizar')
  async index(): Promise<AuthExceptResponse[]> {
    return this.serv.getAll();
  }

  @ApiOkResponse({
    type: AuthExceptResponse,
  })
  @Get(':codigoDispositivo')
  @DefineScope('visualizar')
  show(
    @Param('codigoDispositivo') codigoDispositivo: string,
  ): Promise<AuthExceptResponse> {
    return this.serv.show(codigoDispositivo);
  }

  @ApiCreatedResponse({
    type: AuthExceptResponse,
  })
  @Post()
  @DefineScope('gerenciar')
  async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: AuthExceptRequest,
  ): Promise<AuthExceptResponse> {
    return this.serv.store(body);
  }

  @Put(':codigoDispositivo')
  @DefineScope('gerenciar')
  async update(
    @Param('codigoDispositivo') codigoDispositivo: string,
    @Body() body: AuthExceptRequest,
  ): Promise<AuthExceptResponse> {
    return this.serv.update(codigoDispositivo, body);
  }

  @Delete(':codigoDispositivo')
  @DefineScope('gerenciar')
  @HttpCode(204)
  async destroy(
    @Param('codigoDispositivo') codigoDispositivo: string,
  ): Promise<void> {
    this.serv.destroy(codigoDispositivo);
  }
}
