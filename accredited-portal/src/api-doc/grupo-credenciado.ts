import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsBooleanString, IsArray } from 'class-validator';
import { Credenciado } from './credenciado';
import { GrupoCredenciadoCredenciado } from './grupo-credenciado-credenciado';

export class GrupoCredenciado {

  @ApiProperty()  
  @IsNumber()
  sequencialGrupoCredenciado?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nomeGrupoCredenciado?: string;

  @ApiProperty()
  @IsString()
  descricaoGrupoCredenciado?: string;

  @ApiProperty()
  @IsString()
  emailRepresentante?: string;

  @ApiProperty()
  @IsString()
  celularRepresentante?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  flagAtivo: number;

  @ApiProperty()
  @IsNumber()
  codigoRazaoUso: number;

  @ApiProperty()
  @IsNotEmpty()
  credenciados: Array<number>;

}
