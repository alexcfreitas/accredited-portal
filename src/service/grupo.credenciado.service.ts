import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { Connection } from "typeorm";
import { GrupoCredenciadoRequest } from 'src/api-doc/request/grupo-credenciado-request';
import { BaseService } from './base.service';
import { GrupoCredenciado } from 'src/api-doc/grupo-credenciado';
import { GrupoCredenciadoEntity } from 'src/model/grupo.credenciado.entity';
import { GrupoCredCredEntity } from 'src/model/grupo.cred.cred.entity';

@Injectable()
export class GrupoCredenciadoService extends BaseService {

    private readonly OWNER = 'CADMO';
    private readonly SEQUENCE_GRUPO_CREDENCIADO = 'SQ9501_GRUPOCREDENCIADOPCRED';
    private readonly SEQUENCE_GRUPO_CREDENCIADO_CREDENCIADO = 'SQ9503_GRUPOCREDCREDPCRED';

    constructor(
        @InjectRepository(GrupoCredenciadoEntity)
        private readonly grupoCredenciadoRepo: Repository<GrupoCredenciadoEntity>,

        @InjectRepository(GrupoCredCredEntity)
        private readonly grupoCredenciaoCredenciadoRepo: Repository<GrupoCredCredEntity>,

        @InjectEntityManager()
        private readonly entityManager: EntityManager,

        @InjectConnection()
        private readonly connection: Connection,
    ) {
        super(entityManager);
        this.logger = new Logger(GrupoCredenciadoService.name);
    }


    /**
     * Efetua a inclusao de um grupo de credenciados.
     * 
     * @param grupoCredenciado 
     * @param credenciados 
     * @returns 
     */
    public async incluirGrupoCredenciado(grupoCredenciado: GrupoCredenciado, credenciados: Array<number>): Promise<GrupoCredenciadoEntity> {

        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Entrada::Parametros informados [ grupoCredenciado: [${JSON.stringify(grupoCredenciado)}], credenciados[ ${credenciados}]].`);

        const grupoCredenciadoEntity = this.grupoCredenciadoRepo.create(grupoCredenciado);

        // Atualiza a sequencia
        const seqGrupoCred = await this.getSequence(this.OWNER, this.SEQUENCE_GRUPO_CREDENCIADO);
        grupoCredenciadoEntity.sequencialGrupoCredenciado = seqGrupoCred;

        let retGrupoCredenciadoEntity: GrupoCredenciadoEntity;

        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Inicializando fluxo transacional transacao.`);
        await this.entityManager.transaction(async transactionalEntityManager => {

            try {

                this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Efetuando a persistencia do GrupoCredenciado [${JSON.stringify(grupoCredenciadoEntity)}].`);

                // Persiste as informacoes de grupo Credenciado
                retGrupoCredenciadoEntity = await transactionalEntityManager.save(grupoCredenciadoEntity);

                this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Persistencia efetuada [ ${JSON.stringify(retGrupoCredenciadoEntity)} ].`);

            } catch (err) {

                this.logger.error(`${this.uuidLog}::incluirGrupoCredenciado::Erro ao efetuar a persistencia do GrupoCredenciado. Request: [ ${JSON.stringify(grupoCredenciadoEntity)} ].`, err);
                throw new Error('Erro ao efetuar a persistencia do GrupoCredenciado.');

            }

            if (credenciados) {
                for (let item of credenciados) {

                    // Obtem o sequencial do grupoCredenciado vs Credenciado
                    const seqGrupoCredCred = await this.getSequence(this.OWNER, this.SEQUENCE_GRUPO_CREDENCIADO_CREDENCIADO);

                    // Prepara o objeto de persistencia
                    const credenciadoEntity: GrupoCredCredEntity = this.grupoCredenciaoCredenciadoRepo.create({
                        sequencialGrupoCredenciadoCredenciado: seqGrupoCredCred,
                        sequencialCredenciado: item,
                        sequencialGrupoCredenciado: seqGrupoCred
                    });

                    try {

                        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Efetuando a persistencia do GrupoCredenciadoCredenciado [${JSON.stringify(credenciadoEntity)}].`);

                        let rett = await transactionalEntityManager.save(credenciadoEntity);

                        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Persistencia efetuada [ ${JSON.stringify(credenciadoEntity)} ].`);

                    } catch (err) {

                        this.logger.error(`${this.uuidLog}::incluirGrupoCredenciado::Erro ao efetuar a persistencia do relacionamento entre GrupoCredenciado e o GrupoCredenciadoCredenciado. Request: [ ${JSON.stringify(credenciadoEntity)} ].`, err);
                        throw new Error('Erro ao efetuar a persistencia das informacoes.');

                    }
                }
            }

        });

        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Finalizando fluxo transacional.`);
        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Saida.`);

        return retGrupoCredenciadoEntity;

    }


    /**
     * Efetua a alteracao de um grupo de credenciados.
     * 
     * @param sequencialGrupoCredenciado 
     * @param grupoCredenciado 
     * @param credenciados 
     * @returns 
     */
    public async alterarGrupoCredenciado(sequencialGrupoCredenciado: number, grupoCredenciado: GrupoCredenciado, credenciados: Array<number>): Promise<GrupoCredenciadoEntity> {

        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Entrada::Parametros informados [ sequencialGrupoCredenciado: [ ${sequencialGrupoCredenciado} ], grupoCredenciado: [ ${JSON.stringify(grupoCredenciado)} ], credenciados[ ${credenciados} ] ]`);

        let retGrupoCredenciadoEntity: GrupoCredenciadoEntity;

        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Inicializando fluxo transacional transacao.`);
        await this.entityManager.transaction(async transactionalEntityManager => {

            try {

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Efetuando a verificacao da existencia do registro.`);

                let grupoCredenciadoEntity: GrupoCredenciadoEntity = await transactionalEntityManager.findOneOrFail(GrupoCredenciadoEntity, sequencialGrupoCredenciado);

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Registro localizado.`);

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Efetuando a persistencia do GrupoCredenciado [${JSON.stringify(grupoCredenciadoEntity)}].`);

                // Persiste as informacoes de grupo Credenciado
                let credenciadoAlterado = await transactionalEntityManager.update(GrupoCredenciadoEntity, grupoCredenciadoEntity.sequencialGrupoCredenciado, {
                    celularRepresentante: grupoCredenciado.celularRepresentante,
                    descricaoGrupoCredenciado: grupoCredenciado.descricaoGrupoCredenciado,
                    emailRepresentante: grupoCredenciado.emailRepresentante,
                    flagAtivo: grupoCredenciado.flagAtivo,
                    nomeGrupoCredenciado: grupoCredenciado.nomeGrupoCredenciado,
                    codigoTipoRazaoUso: grupoCredenciado.codigoRazaoUso,
                    // TODO Ajustar o docigo da classe 
                    codigoClasseTipoRazaoUso: 0

                });

                if (credenciadoAlterado) {
                    retGrupoCredenciadoEntity = {
                        celularRepresentante: grupoCredenciado.celularRepresentante,
                        descricaoGrupoCredenciado: grupoCredenciado.descricaoGrupoCredenciado,
                        emailRepresentante: grupoCredenciado.emailRepresentante,
                        flagAtivo: grupoCredenciado.flagAtivo,
                        nomeGrupoCredenciado: grupoCredenciado.nomeGrupoCredenciado,
                        codigoTipoRazaoUso: grupoCredenciado.codigoRazaoUso,
                        // TODO Ajustar o docigo da classe 
                        codigoClasseTipoRazaoUso: 0,
                        sequencialGrupoCredenciado: grupoCredenciadoEntity.sequencialGrupoCredenciado
                    };
                }

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Persistencia efetuada [ ${JSON.stringify(retGrupoCredenciadoEntity)} ].`);

            } catch (err) {

                this.logger.error(`${this.uuidLog}::alterarGrupoCredenciado::Erro ao efetuar a persistencia do GrupoCredenciado. Request: [ sequencial: ${sequencialGrupoCredenciado}, GrupoCredenciado: ${JSON.stringify(grupoCredenciado)} ].`, err);
                throw new Error('Erro ao efetuar a persistencia do GrupoCredenciado.');

            }

            if (credenciados) {

                // Exclui os credenciados existentes
                const sqlExcusao = `DELETE FROM CADMO.TB9503_GRUPOCREDCREDPCRED where TB9501_SQ_GRUPOCREDPCRED = :seqGrpoCredenciado`;

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Efetuando a exclusao dos relacionamentos de grupocredenciado para o id [${sequencialGrupoCredenciado}].`);

                await transactionalEntityManager.query(sqlExcusao, [sequencialGrupoCredenciado]);

                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Exclusao efetuada.`);

                // Percorre os credenciados informados para efetuar o insert dos mesmos.
                for (let item of credenciados) {

                    // Obtem o sequencial
                    const seqGrupoCredCred = await this.getSequence(this.OWNER, this.SEQUENCE_GRUPO_CREDENCIADO_CREDENCIADO);

                    // Prepara o objeto de persistencia
                    const credenciadoEntity: GrupoCredCredEntity = this.grupoCredenciaoCredenciadoRepo.create({
                        sequencialGrupoCredenciadoCredenciado: seqGrupoCredCred,
                        sequencialCredenciado: item,
                        sequencialGrupoCredenciado: sequencialGrupoCredenciado
                    });

                    try {

                        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Efetuando a persistencia do GrupoCredenciadoCredenciado [${JSON.stringify(credenciadoEntity)}].`);

                        await transactionalEntityManager.save(credenciadoEntity);

                        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Persistencia efetuada [ ${JSON.stringify(credenciadoEntity)} ].`);

                    } catch (err) {

                        this.logger.error(`${this.uuidLog}::alterarGrupoCredenciado::Erro ao efetuar a persistencia do relacionamento entre GrupoCredenciado e o GrupoCredenciadoCredenciado.  Request: [ ${JSON.stringify(credenciadoEntity)} ].`, err);
                        throw new Error('Erro ao efetuar a persistencia do GrupoCredenciado.');

                    }
                }
            }

        });

        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Finalizando fluxo transacional.`);
        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Saida.`);

        return retGrupoCredenciadoEntity;

    }


    /**
     * Efetua a exclusao de um grupo de credenciados.
     * 
     * @param sequencialGrupoCredenciado 
     */
    public async excluirGrupoCredenciado(sequencialGrupoCredenciado: number): Promise<void> {

        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Entrada::Parametros informados [ sequencialGrupoCredenciado: [ ${sequencialGrupoCredenciado} ] ]`);

        let retGrupoCredenciadoEntity: GrupoCredenciadoEntity;

        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Inicializando fluxo transacional transacao.`);
        await this.entityManager.transaction(async transactionalEntityManager => {

            try {

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Efetuando a verificacao da existencia do registro.`);

                let grpoCred = await transactionalEntityManager.findOneOrFail(GrupoCredenciadoEntity, sequencialGrupoCredenciado);

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Registro localizado [${JSON.stringify(grpoCred)}].`);

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Efetuando a exclusao dos relacionamentos de grupocredenciado para o id [${sequencialGrupoCredenciado}].`);

                // Exclui os credenciados existentes para o grupo de credenciados
                const sqlExcusao = `DELETE FROM CADMO.TB9503_GRUPOCREDCREDPCRED where TB9501_SQ_GRUPOCREDPCRED = :seqGrpoCredenciado`;
                await transactionalEntityManager.query(sqlExcusao, [sequencialGrupoCredenciado]);

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Exclusao efetuada.`);

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Efetuando a exclusao do grupo credenciado [ ${sequencialGrupoCredenciado} ].`);

                await transactionalEntityManager.delete(GrupoCredenciadoEntity, sequencialGrupoCredenciado);

                this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Exclusao efetuada.`);

            } catch (err) {

                this.logger.error(`${this.uuidLog}::excluirGrupoCredenciado::Erro ao efetuar a exclusao do GrupoCredenciado. Request: [ ${sequencialGrupoCredenciado} ].`, err);
                throw new Error('Erro ao efetuar a persistencia do GrupoCredenciado.');

            }

        });

        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Finalizando fluxo transacional.`);
        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Saida.`);

    }

    /**
     * Efetua a pesquisa de grupos de credenciados com base nos parametros informados.
     * 
     * @param nomeCredenciado 
     * @param flagAtivo 
     * @param credenciados 
     * @param codigoRazaoUso 
     * @returns 
     */
    public async pesquisarGrupoCredenciado(nomeCredenciado?: string, flagAtivo?: boolean, credenciados?: Array<number>, codigoRazaoUso?: number, gruposCredenciado?: Array<number>, numeroPagina?: number, tamanhoPagina?: number): Promise<Array<GrupoCredenciadoEntity>> {

        this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Entrada::Parametros informados [ 
            nomeCredenciado: [ ${nomeCredenciado} ], 
            flagAtivo: [ ${flagAtivo} ], 
            credenciados: [ ${credenciados} ], 
            codigoRazaoUso: [ ${codigoRazaoUso} ]
            gruposCredenciado: [ ${gruposCredenciado} ] ]`);

        try {

            const strGruposCredenciado = gruposCredenciado !== undefined && gruposCredenciado.length > 0 ? `
                AND TB9503.TB9501_SQ_GRUPOCREDPCRED IN ( ${gruposCredenciado} )
            ` : "";

            const strCredenciados = credenciados !== null && credenciados.length > 0 ? `
                AND TB9503.TB9501_SQ_GRUPOCREDPCRED IN ( ${credenciados.toString()} )
            ` : "";

            const strNomeCredenciado = nomeCredenciado !== null && nomeCredenciado.length > 0 ? `
                AND TB9501.TB9501_NM_GRUPOCREDPCRED like '%${nomeCredenciado}%'
            ` : "";

            const strFlagAtivo = flagAtivo !== null ? `
                AND TB9501.TB9501_FL_ATIVO = ${flagAtivo ? 1 : 0}
            ` : "";

            const strCodigoRazaoUso = codigoRazaoUso !== null && codigoRazaoUso !== undefined ? `
                AND TB9501.TB0025_TP_RAZAOUSO = ${codigoRazaoUso}
            ` : "";

            const sql = `
                SELECT
                    TB9501_SQ_GRUPOCREDPCRED,
                    TB9501_NM_GRUPOCREDPCRED,
                    TB9501_DS_GRUPOCREDPCRED,
                    TB9501_DS_EMAILREPR,
                    TB9501_NR_CELULARREPR,
                    TB9501_FL_ATIVO,
                    TB0025_CL_TPRAZAOUSO,
                    TB0025_TP_RAZAOUSO 
                FROM (
                    SELECT
                        ROWNUM NUM,
                        T.*
                    FROM (
                        SELECT
                            TB9501.TB9501_SQ_GRUPOCREDPCRED,
                            TB9501.TB9501_NM_GRUPOCREDPCRED,
                            TB9501.TB9501_DS_GRUPOCREDPCRED,
                            TB9501.TB9501_DS_EMAILREPR,
                            TB9501.TB9501_NR_CELULARREPR,
                            TB9501.TB9501_FL_ATIVO,
                            TB9501.TB0025_CL_TPRAZAOUSO,
                            TB9501.TB0025_TP_RAZAOUSO
                        FROM 
                            CADMO.tb9501_grupocredenciadopcred TB9501,
                            CADMO.tb9503_grupocredcredpcred TB9503
                        WHERE
                            TB9501.TB9501_SQ_GRUPOCREDPCRED = TB9503.TB9501_SQ_GRUPOCREDPCRED
                            ${strGruposCredenciado}
                            ${strCredenciados}
                            ${strNomeCredenciado}
                            ${strFlagAtivo}
                            ${strCodigoRazaoUso}
                        GROUP BY
                            TB9501.TB9501_SQ_GRUPOCREDPCRED,
                            TB9501.TB9501_NM_GRUPOCREDPCRED,
                            TB9501.TB9501_DS_GRUPOCREDPCRED,
                            TB9501.TB9501_DS_EMAILREPR,
                            TB9501.TB9501_NR_CELULARREPR,
                            TB9501.TB9501_FL_ATIVO,
                            TB9501.TB0025_CL_TPRAZAOUSO,
                            TB9501.TB0025_TP_RAZAOUSO
                    ) T
                ) 
                WHERE 
                    ((:numeroPagina - 1) * :tamanhoPagina) < NUM 
                    AND NUM <= (:numeroPagina * :tamanhoPagina)
            `;

            this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Efetuando a pesquisa dos grupos de credenciados.`);

            const grupos: Array<any> = await this.entityManager.query(sql, [
                numeroPagina, tamanhoPagina, numeroPagina, tamanhoPagina
            ]);

            const listaGrupoCredenciadoEntity: Array<GrupoCredenciadoEntity> = new Array();
            // Efetua a transformacao do resultado da query para a entity

            if (grupos) {

                for (let grupo of grupos) {

                    listaGrupoCredenciadoEntity.push({
                        codigoClasseTipoRazaoUso: grupo.TB0025_CL_TPRAZAOUSO,
                        codigoTipoRazaoUso: grupo.TB0025_TP_RAZAOUSO,
                        flagAtivo: grupo.TB9501_FL_ATIVO,
                        nomeGrupoCredenciado: grupo.TB9501_NM_GRUPOCREDPCRED,
                        sequencialGrupoCredenciado: grupo.TB9501_SQ_GRUPOCREDPCRED,
                        celularRepresentante: grupo.TB9501_NR_CELULARREPR,
                        descricaoGrupoCredenciado: grupo.TB9501_DS_GRUPOCREDPCRED,
                        emailRepresentante: grupo.TB9501_DS_EMAILREPR,
                        dataAlteracao: null,
                        usuarioAlteracao: null,
                        dataCriacao: null,
                        usuarioCriacao: null
                    });

                }
            }

            this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Grupos retornados ${JSON.stringify(listaGrupoCredenciadoEntity)}.`);

            this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Saida.`);

            return listaGrupoCredenciadoEntity;

        } catch (err) {
            this.logger.error(`${this.uuidLog}::pesquisarGrupoCredenciado::Erro ao efetuar a pesquisa das informacoes. Parametros informados [ 
                nomeCredenciado: [ ${nomeCredenciado} ], 
                flagAtivo: [ ${flagAtivo} ], 
                credenciados: [ ${credenciados} ], 
                codigoRazaoUso: [ ${codigoRazaoUso} ]
                gruposCredenciado: [ ${gruposCredenciado} ] ]`, err);
            throw new Error('Erro ao efetuar a pesquisa das informacoes.');
        }

    }

    /**
     * Efetua a consulta dos grupos de conveniados por meio da lista de ids informada nos parametros.
     * 
     * @param codigosGrupoCredenciado 
     * @returns 
     */
    public async consultarGrupoCredenciadoPorIds(codigosGrupoCredenciado: Array<number>): Promise<Array<GrupoCredenciadoEntity>> {

        this.logger.log(`${this.uuidLog}::consultarGrupoCredenciadoPorIds::Entrada::Parametros informados [ codigosGrupoCredenciado: [ ${codigosGrupoCredenciado} ] ]`);

        let grupos: Array<GrupoCredenciadoEntity>;

        try {

            // Efetua a busca dos credenciados com base no codigo do grupo
            grupos = await this.grupoCredenciadoRepo.find({
                where: [
                    { sequencialGrupoCredenciado: In(codigosGrupoCredenciado) },
                ]
            });

            this.logger.log(`${this.uuidLog}::consultarGrupoCredenciadoPorIds::Saida.`);

        } catch (err) {
            this.logger.error(`${this.uuidLog}::consultarGrupoCredenciadoPorIds::Erro ao efetuar a consulta das informacoes. Request: [ ${codigosGrupoCredenciado} ].`, err);
            throw new Error('Erro ao efetuar a consulta das informacoes.');
        }

        return grupos;

    }


    /**
     * Obtem os ids dos grupos de credenciado cadastrados com base no codigo de razao de uso informada nos parametros.
     * 
     * @param codigoRazaoUso ]
     * @returns 
     */
    public async obterGrupoCredenciadoRazaoUso(codigoRazaoUso: number): Promise<Array<number>> {

        this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Entrada::Parametros informados [ codigoRazaoUso: [ ${codigoRazaoUso} ] ]`);

        let ids: Array<number> = [];

        // Efetua a busca dos ids de grupo credenciados que estao cadastrados em um determinado codigo de razao de uso   
        try {

            this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Efetuando a pesquisa dos grupos de credenciados.`);

            let grupos: Array<GrupoCredenciadoEntity> = await this.grupoCredenciadoRepo.find({
                select: ['sequencialGrupoCredenciado'],
                where: [
                    { codigoTipoRazaoUso: codigoRazaoUso },
                ]
            });

            this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Grupos retornados ${JSON.stringify(grupos)}.`);

            if (grupos) {
                for (let grupo of grupos) {
                    ids.push(grupo.sequencialGrupoCredenciado);
                }
            }

        } catch (err) {

            this.logger.error(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Erro ao efetuar a pesquisa das informacoes. Request: [ ${codigoRazaoUso} ].`, err);
            throw new Error('Erro ao efetuar a pesquisa das informacoes.');

        }

        this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Saida.`);

        return ids;
    }


    /**
     * Obtem os ids dos credenciado cadastrados com base no codigo de grupo de credenciado informada nos parametros.
     * 
     * @param codigoGrupoCredenciado 
     * @returns 
     */
    public async obterIdsCredenciados(codigoGrupoCredenciado: number): Promise<Array<number>> {

        this.logger.log(`${this.uuidLog}::obterIdsCredenciados::Entrada::Parametros informados [ codigoGrupoCredenciado: [ ${codigoGrupoCredenciado} ] ]`);

        let ids: Array<number> = [];

        // Efetua a busca dos ids de credenciados que estao cadastrados em um determinado grupo de credenciado
        try {

            this.logger.log(`${this.uuidLog}::obterIdsCredenciados::Efetuando a pesquisa dos grupos de credenciados.`);

            let grupos: Array<GrupoCredCredEntity> = await this.grupoCredenciaoCredenciadoRepo.find({
                select: ['sequencialCredenciado'],
                where: [
                    { sequencialGrupoCredenciado: codigoGrupoCredenciado },
                ]
            });

            this.logger.log(`${this.uuidLog}::obterIdsCredenciados::Grupos retornados ${JSON.stringify(grupos)}.`);

            if (grupos) {
                for (let grupo of grupos) {
                    ids.push(grupo.sequencialCredenciado);
                }
            }

        } catch (err) {

            this.logger.error(`${this.uuidLog}::obterIdsCredenciados::Erro ao efetuar a pesquisa das informacoes. Request: [ ${codigoGrupoCredenciado} ].`, err);
            throw new Error('Erro ao efetuar a pesquisa das informacoes.');

        }

        this.logger.log(`${this.uuidLog}::obterIdsCredenciados::Saida.`);

        return ids;
    }


    /**
     * Obetm todos os grupos de conveniados cadastrados na base.
     * 
     * @returns 
     */
    public async getAll(): Promise<GrupoCredenciadoEntity[]> {
        return this.grupoCredenciadoRepo.find();
    }

    /**
     * Obtem o grupo de conveniado com base no Id informado no parametro.
     * 
     * @param id 
     * @returns 
     */
    public async show(id: number): Promise<GrupoCredenciadoEntity> {
        return this.grupoCredenciadoRepo.findOneOrFail(id);
    }

    /**
     * Efetua a persistencia de um grupo de credenciao nao efetuando o relacionamento entre grupo de credenciado e conveniado.
     * 
     * @param body 
     * @returns 
     */
    public async store(body: GrupoCredenciado): Promise<GrupoCredenciadoEntity> {

        const grupoCredenciado = this.grupoCredenciadoRepo.create(body);

        // Atualiza a sequencia
        const seq = await this.getSequence(this.OWNER, this.SEQUENCE_GRUPO_CREDENCIADO);
        grupoCredenciado.sequencialGrupoCredenciado = seq;
        return this.grupoCredenciadoRepo.save(grupoCredenciado);

    }

    /**
     * Efetua a alteracao de um grupo de credenciao nao atualizando o relacionamento entre grupo de credenciado e conveniado.
     * 
     * @param id 
     * @param body 
     * @returns 
     */
    public async update(id: number, body: GrupoCredenciadoRequest): Promise<GrupoCredenciadoEntity> {
        await this.grupoCredenciadoRepo.findOneOrFail(id);
        this.grupoCredenciadoRepo.update(id, body);
        return this.grupoCredenciadoRepo.findOneOrFail(id);
    }

    /**
     * Efetua a exclusao de um grupo de credenciado nao respeitando o relacionamento entre grupo de credenciado e conveniado.
     * @param id      * 
     */
    public async destroy(id: number): Promise<void> {
        await this.grupoCredenciadoRepo.findOneOrFail(id);
        this.grupoCredenciadoRepo.delete(id);
    }

}
