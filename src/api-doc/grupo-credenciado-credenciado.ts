import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString, IsBooleanString, IsArray } from 'class-validator';
import { Credenciado } from './credenciado';

export class GrupoCredenciadoCredenciado {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public sequencialGrupoCredenciadoCredenciado: number;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  
  public sequencialCredenciado: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public sequencialGrupoCredenciado: number;
  
}
