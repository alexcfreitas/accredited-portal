import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB0248_MENSAGEMTEXTO')
export class Dominio {
  @PrimaryGeneratedColumn({ name: 'TB0248_ID_MENSAGEM' })
  id: number;

  @Column({ name: 'TB0248_DT_SITUACAO' })
  dataSituacao: Date;

  @Column({ name: 'TB0248_DS_TEXTO' })
  descricaoTexto: string;

  @Column({ name: 'TB0248_NR_TELEFONE' })
  numeroTelefone: number;

  @Column({ name: 'TB0248_DS_TOKEN' })
  descricaoToken: string;

  @Column({ name: 'TB0248_QT_TENTATIVASPROCESSO' })
  quantidadeTentativasProcesso: number;

  @Column({ name: 'TB0025_ST_MENSAGEM' })
  statusMensagem: number;

  @Column({ name: 'TB0025_CL_STMENSAGEM' })
  classeStatusMensagem: number;

  @Column({ name: 'TB0025_CL_RETORNOPROCESSO' })
  classeRetornoProcesso: number;

  @Column({ name: 'TB0025_TP_RETORNOPROCESSO' })
  tipoRetornoProcesso: number;

  @Column({ name: 'TB0248_DT_CRIACAO' })
  dataCriacao: Date;

  @Column({ name: 'TB0248_NM_USUARIOCRIACAO' })
  usuarioCriacao: string;

  @Column({ name: 'TB0248_DT_ALTERACAO' })
  dataAlteracao: Date;

  @Column({ name: 'TB0248_NM_USUARIOALTERACAO' })
  usuarioAlteracao: string;
}
