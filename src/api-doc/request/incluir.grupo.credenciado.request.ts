import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray, IsBoolean } from 'class-validator';

export class IncluirGrupoCredenciadoRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nomeGrupoCredenciado: string;

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
  @IsBoolean()
  flagAtivo: boolean;

  @ApiProperty()
  @IsArray()  
  credenciados: Array<number>;

}
