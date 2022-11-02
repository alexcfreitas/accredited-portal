import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class AuthExceptRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  codigoDispositivo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  codigoAuthExcept: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dataExpiracao: Date;
}
