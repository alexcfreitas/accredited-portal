import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, IsOptional } from 'class-validator';

export class PesquisarGrupoCredenciadoRequest {
  
  @ApiProperty()  
  @IsString()
  @IsOptional()
  nomeGrupoCredenciado?: string;

  @ApiProperty()  
  @IsBoolean()
  @IsOptional()
  flagAtivo?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  codigoRecurso?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  codigoRazaoUso?: number;

  @ApiProperty()
  @IsArray()
  @IsOptional()  
  credenciados?: Array<number>;

}
