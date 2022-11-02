import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from './response.base';

export class IncluirGrupoCredenciadoResponse extends ResponseBase {

  @ApiProperty()
  public sequencialGrupoCredenciado: number;

  @ApiProperty()
  public nomeGrupoCredenciado: string;

  @ApiProperty()
  public descricaoGrupoCredenciado: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public celularRepresentante: string;

  @ApiProperty()
  public flagAtivo: boolean;

}
