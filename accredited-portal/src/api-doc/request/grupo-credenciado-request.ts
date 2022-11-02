import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsBooleanString } from 'class-validator';

export class GrupoCredenciadoRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nomeGrupoCredenciado: string;

  @ApiProperty()
  @IsString()
  descricaoGrupoCredenciado: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  celularRepresentante: string;

  /*
  @ApiProperty()
  @IsNotEmpty()
  @IsBooleanString()
  flagAtivo: boolean;
  */

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  flagAtivo: number;
}
