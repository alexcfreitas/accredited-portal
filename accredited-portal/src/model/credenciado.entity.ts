import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('TB9502_CREDENCIADOPCRED')
export class CredenciadoEntity {

    @PrimaryColumn({ name: 'TB9502_SQ_CREDENCIADOPCRED'})
    sequencialCredenciado: number;

    @Column({ name: 'TB9502_SQ_RAZAOUSOPCRED', nullable: true })
    sequencialRazaoUsoCredenciado?: number;

    @Column({ name: 'TB9502_NM_CREDENCIADOPCRED', length: 100})
    nomeCredenciado: string;

    @Column({ name: 'TB9502_NM_FANTASIA', length: 100, nullable: true })
    nomeFantasia?: string;

    @Column({ name: 'TB0025_CL_TPCREDENCIADO'})
    classeTipoCredenciado: number;

    @Column({ name: 'TB0025_TP_CREDENCIADO'})
    tidpoCredenciado: number;

    @Column({ name: 'TB9501_FL_ATIVO'})
    flagAtivo: number;

    @Column({ name: 'TB9502_DT_CRIACAO' })
    dataCriacao: Date;

    @Column({ name: 'TB9502_NM_USUARIOCRIACAO', length: 30 })
    usuarioCriacao: string;

    @Column({ name: 'TB9502_DT_ALTERACAO' })
    dataAlteracao: Date;

    @Column({ name: 'TB9502_NM_USUARIOALTERACAO', length: 30 })
    usuarioAlteracao: string;

}
