import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB0505_AUTHEXCEPT')
export class AuthExcept {
  @PrimaryColumn({ name: 'TB0505_CD_DISPOSITIVO' })
  codigoDispositivo: string;

  @Column({ name: 'TB0505_CD_AUTHEXCEPT' })
  codigoAuthExcept: number;

  @Column({ name: 'TB0505_DT_EXPIRACAO' })
  dataExpiracao: Date;

  @Column({ name: 'TB0505_DT_CRIACAO' })
  dataCriacao: Date;

  @Column({ name: 'TB0505_NM_USUARIOCRIACAO' })
  usuarioCriacao: string;

  @Column({ name: 'TB0505_DT_ALTERACAO' })
  dataAlteracao: Date;

  @Column({ name: 'TB0505_NM_USUARIOALTERACAO' })
  usuarioAlteracao: string;
}
