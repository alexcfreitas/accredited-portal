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
import { UserGroupService } from '../service/user-group.service';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserGroupResponse } from '../api-doc/response/user-group.response';
import { UserGroupRequest } from '../api-doc/request/user-group.request';
import { DefineResource, DefineScope } from 'nestjs-keycloak-admin';

@Controller('grupo-usuario')
@DefineResource('grupo-usuario')
export class UserGroupController {
  constructor(private serv: UserGroupService) {}

  @Get()
  @DefineScope('visualizar')
  async index(): Promise<UserGroupResponse[]> {
    return this.serv.getAll();
  }

  @ApiOkResponse({
    type: UserGroupResponse,
  })
  @Get(':id')
  @DefineScope('visualizar')
  show(@Param('id') id: string): Promise<UserGroupResponse> {
    return this.serv.show(id);
  }

  @ApiCreatedResponse({
    type: UserGroupResponse,
  })
  @Post()
  @DefineScope('gerenciar')
  async store(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: UserGroupRequest,
  ): Promise<UserGroupResponse> {
    return this.serv.store(body);
  }

  @Put(':id')
  @DefineScope('gerenciar')
  async update(
    @Param('id') id: string,
    @Body() body: UserGroupRequest,
  ): Promise<UserGroupResponse> {
    return this.serv.update(id, body);
  }

  @Delete(':id')
  @DefineScope('gerenciar')
  @HttpCode(204)
  async destroy(@Param('id') id: string): Promise<void> {
    this.serv.destroy(id);
  }
}
