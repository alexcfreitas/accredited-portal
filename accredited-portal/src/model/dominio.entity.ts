import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('TB0025_DOMINIO')
export class Dominio {
  @PrimaryColumn({ name: 'TB0025_CD_DOMINIO' })
  codigoDominio: number;

  @PrimaryColumn({ name: 'TB0024_CD_CLASSE' })
  codigoClasse: number;

  @Column({ name: 'TB0025_DT_ALTERACAO' })
  dataAlteracao: Date;

  @Column({ name: 'TB0025_DT_CRIACAO' })
  dataCriacao: Date;

  @Column({ name: 'TB0025_DS_DOMINIO' })
  descricao: string;

  @Column({ name: 'TB0025_FL_ATIVO' })
  flagAtivo: boolean;

  @Column({ name: 'TB0025_NM_DOMINIO' })
  nome: string;

  @Column({ name: 'TB0025_NM_USUARIOCRIACAO' })
  usuarioCriacao: string;

  @Column({ name: 'TB0025_NM_USUARIOALTERACAO' })
  usuarioAlteracao: string;
}
