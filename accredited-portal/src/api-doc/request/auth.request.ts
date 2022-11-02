import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}

export interface TicketForm {
  token: string;
  audience: string;
  grant_type?: string;
  resourceId?: string;
  scope?: string;
  response_mode?: TicketResponseMode;
}
export declare enum TicketResponseMode {
  permissions = 'permissions',
  decision = 'decision',
}
