import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty()
  access_token?: any;

  @ApiProperty()
  refresh_token?: any;

  @ApiProperty()
  id_token?: any;

  @ApiProperty()
  expires_in?: string;

  @ApiProperty()
  token_type?: string;

  @ApiProperty()
  permissions_token?: string;

  @ApiProperty()
  resource_token?: string;
}
