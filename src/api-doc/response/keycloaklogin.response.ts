import { ApiProperty } from '@nestjs/swagger';

export class KeycloakLoginResponse {
  @ApiProperty()
  'access_token': string;

  @ApiProperty()
  'expires_in': number;

  @ApiProperty()
  'refresh_expires_in': number;

  @ApiProperty()
  'refresh_token': string;

  @ApiProperty()
  'token_type': string;

  @ApiProperty()
  'id_token': string;

  @ApiProperty()
  'not-before-policy': number;

  @ApiProperty()
  'session_state': string;

  @ApiProperty()
  'scope': string;
}
