import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('TB9501_GRUPOCREDENCIADOPCRED')
export class GrupoCredenciadoEntity {

    @PrimaryColumn({ name: 'TB9501_SQ_GRUPOCREDPCRED' })
    public sequencialGrupoCredenciado: number;
    
    @Column({ name: 'TB9501_NM_GRUPOCREDPCRED' })
    nomeGrupoCredenciado: string;

    @Column({ name: 'TB9501_DS_GRUPOCREDPCRED', length: 250, nullable: true })
    descricaoGrupoCredenciado?: string;

    @Column({ name: 'TB9501_DS_EMAILREPR', length: 100, nullable: true })
    emailRepresentante?: string;

    @Column({ name: 'TB9501_NR_CELULARREPR', length: 15, nullable: true })
    celularRepresentante?: string;

    @Column({ name: 'TB9501_FL_ATIVO' })
    flagAtivo: number;

    @Column({ name: 'TB0025_CL_TPRAZAOUSO' })
    codigoClasseTipoRazaoUso: number;

    @Column({ name: 'TB0025_TP_RAZAOUSO' })
    codigoTipoRazaoUso: number;

    @Column({ name: 'TB9501_DT_CRIACAO' })
    dataCriacao?: Date;

    @Column({ name: 'TB9501_NM_USUARIOCRIACAO', length: 30 })
    usuarioCriacao?: string;

    @Column({ name: 'TB9501_DT_ALTERACAO' })
    dataAlteracao?: Date;

    @Column({ name: 'TB9501_NM_USUARIOALTERACAO', length: 30 })
    usuarioAlteracao?: string;

}
