import { ApiProperty } from '@nestjs/swagger';

export class UserGroupResponse {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  path?: string;
  @ApiProperty()
  subGroups?: GroupRepresentation[];
  @ApiProperty()
  access?: Record<string, boolean>;
  @ApiProperty()
  attributes?: Record<string, any>;
  @ApiProperty()
  clientRoles?: Record<string, any>;
  @ApiProperty()
  realmRoles?: string[];
}

export default interface GroupRepresentation {
  id?: string;
  name?: string;
  path?: string;
  subGroups?: GroupRepresentation[];
  access?: Record<string, boolean>;
  attributes?: Record<string, any>;
  clientRoles?: Record<string, any>;
  realmRoles?: string[];
}
