import { KeycloakService } from 'nestjs-keycloak-admin';
import { UserGroupResponse } from '../api-doc/response/user-group.response';
import { UserGroupRequest } from '../api-doc/request/user-group.request';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGroupService {
  constructor(private serv: KeycloakService) {}

  async getAll(): Promise<UserGroupResponse[]> {
    return await this.serv.client.groups.find();
  }

  async show(id: string): Promise<UserGroupResponse> {
    return await this.serv.client.groups.findOne({ id });
  }

  async store(body: UserGroupRequest): Promise<UserGroupResponse> {
    return await this.serv.client.groups.create(body);
  }

  async update(id: string, body: UserGroupRequest): Promise<UserGroupResponse> {
    const query = { id };
    await this.serv.client.groups.update(query, body);
    return await this.serv.client.groups.findOne({ id });
  }

  async destroy(id: string): Promise<void> {
    return await this.serv.client.groups.del({ id });
  }
}
