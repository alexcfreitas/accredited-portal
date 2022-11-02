import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('TB9503_GRUPOCREDCREDPCRED')
export class GrupoCredCredEntity {

    @PrimaryColumn({ name: 'TB9503_SQ_GRPCREDCREDPCRED'})
    sequencialGrupoCredenciadoCredenciado: number;

    @Column({ name: 'TB9502_SQ_CREDENCIADOPCRED'})
    sequencialCredenciado: number;

    @Column({ name: 'TB9501_SQ_GRUPOCREDPCRED'})
    sequencialGrupoCredenciado: number;

    @Column({ name: 'TB9503_DT_CRIACAO' })
    dataCriacao: Date;

    @Column({ name: 'TB9503_NM_USUARIOCRIACAO', length: 30 })
    usuarioCriacao: string;

    @Column({ name: 'TB9503_DT_ALTERACAO' })
    dataAlteracao: Date;

    @Column({ name: 'TB9503_NM_USUARIOALTERACAO', length: 30 })
    usuarioAlteracao: string;

}
