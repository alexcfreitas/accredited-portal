import { ApiProperty } from '@nestjs/swagger';
import { ResponseBase } from './response.base';

export class ObterGrupoCredenciadoRazaoUsoResponse extends ResponseBase {

  @ApiProperty()
  public sequencialGrupos: Array<number>;

}
