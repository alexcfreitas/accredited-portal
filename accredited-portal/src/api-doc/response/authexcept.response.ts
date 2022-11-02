import { ApiProperty } from '@nestjs/swagger';

export class AuthExceptResponse implements Readonly<AuthExceptResponse> {
  @ApiProperty()
  codigoDispositivo: string;

  @ApiProperty()
  codigoAuthExcept: number;

  @ApiProperty()
  dataExpiracao: Date;
}
