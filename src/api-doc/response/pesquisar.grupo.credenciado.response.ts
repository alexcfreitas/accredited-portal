import { ApiProperty } from '@nestjs/swagger';
import { GrupoCredenciado } from '../grupo-credenciado';
import { ResponseBase } from './response.base';

export class PesquisarGrupoCredenciadoResponse extends ResponseBase {

  @ApiProperty()
  public grupos: Array<GrupoCredenciado>;

}
