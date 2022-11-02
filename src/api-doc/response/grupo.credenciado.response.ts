import { ApiProperty } from '@nestjs/swagger';
import { GrupoCredenciadoEntity } from 'src/model/grupo.credenciado.entity';

export class GrupoCredenciadoResponse implements Readonly<GrupoCredenciadoResponse> {

  @ApiProperty()
  sequencialGrupoCredenciado: number;

  @ApiProperty()
  nomeGrupoCredenciado: string;

  @ApiProperty()
  descricaoGrupoCredenciado: string;

  @ApiProperty()
  emailRepresentante: string;

  @ApiProperty()
  celularRepresentante: string;

  @ApiProperty()
  flagAtivo: number;

  public static from(partial: Partial<GrupoCredenciadoResponse>) {
    /*
    const grupoGredenciado = new GrupoCredenciado(null);
    grupoGredenciado.celularRepresentante = partial.celularRepresentante;
    grupoGredenciado.descricaoGrupoCredenciado = partial.descricaoGrupoCredenciado;
    grupoGredenciado.email = partial.email;
    grupoGredenciado.flagAtivo = partial.flagAtivo;
    grupoGredenciado.nomeGrupoCredenciado = partial.nomeGrupoCredenciado;
    grupoGredenciado.sequencialGrupoCredenciado = partial.sequencialGrupoCredenciado;    
    return grupoGredenciado;
    */
  }

  public static fromEntity(entity: GrupoCredenciadoEntity) {
    return this.from({      
      celularRepresentante: entity.celularRepresentante,
      descricaoGrupoCredenciado: entity.descricaoGrupoCredenciado,
      emailRepresentante: entity.emailRepresentante,
      flagAtivo: entity.flagAtivo,
      nomeGrupoCredenciado: entity.nomeGrupoCredenciado,
      sequencialGrupoCredenciado: entity.sequencialGrupoCredenciado,
    });
  }
}
