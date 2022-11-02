import { Injectable, Logger } from '@nestjs/common';
import { GrupoCredenciado } from 'src/api-doc/grupo-credenciado';
import { AlterarGrupoCredenciadoRequest } from 'src/api-doc/request/alterar.grupo.credenciado.request';
import { IncluirGrupoCredenciadoRequest } from 'src/api-doc/request/incluir.grupo.credenciado.request';
import { AlterarGrupoCredenciadoResponse } from 'src/api-doc/response/alterar.grupo.credenciado.response';
import { ExcluirGrupoCredenciadoResponse } from 'src/api-doc/response/excluir.grupo.credenciado.response';
import { IncluirGrupoCredenciadoResponse } from 'src/api-doc/response/incluir.grupo.credenciado.response';
import { ObterGrupoCredenciadoRazaoUsoResponse } from 'src/api-doc/response/obter.grupo.credenciado.razao.uso.response';
import { PesquisarGrupoCredenciadoResponse } from 'src/api-doc/response/pesquisar.grupo.credenciado.response';
import { GrupoCredenciadoEntity } from 'src/model/grupo.credenciado.entity';
import { BaseUuidLog } from 'src/api-doc/base.uuid';
import { GrupoCredenciadoService } from 'src/service/grupo.credenciado.service';

@Injectable()
export class GrupoCredenciadoBusiness extends BaseUuidLog {

    private readonly logger = new Logger(GrupoCredenciadoBusiness.name);

    constructor(
        private grupoCredenciadoService: GrupoCredenciadoService,
    ) { 
        super();
    }

    /**
     * Efetua a inclusao de um grupo de credenciado.
     * 
     * @param req 
     * @returns 
     */
    public async incluirGrupoCredenciado(req: IncluirGrupoCredenciadoRequest): Promise<IncluirGrupoCredenciadoResponse> {

        // Log Entrada
        this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Entrada`);

        // Efetua a validacao do request
        if (!req){
            throw new Error(`Request invalido [ ${JSON.stringify(req)} ]`);
        }

        if(!req.nomeGrupoCredenciado) {
            throw new Error(`Nome do credenciado nao informado. [ ${JSON.stringify(req)} ]`);
        }

        if(req.flagAtivo == undefined) {
            throw new Error(`Flag Ativo nao informado. [ ${JSON.stringify(req)} ]`);
        }

        // Mapeia o grupo credenciado recebido no request
        const grupoCredenciado: GrupoCredenciado = {
            celularRepresentante: req.celularRepresentante,
            descricaoGrupoCredenciado: req.descricaoGrupoCredenciado,
            emailRepresentante: req.emailRepresentante,
            flagAtivo: req.flagAtivo ? 1 : 0,
            nomeGrupoCredenciado: req.nomeGrupoCredenciado,
            credenciados: req.credenciados, 
            codigoRazaoUso: 0 // TODO ajustar
        }

        // Verificar se existem ao menos 2 conveniados na lista
        if (!req.credenciados || req.credenciados.length <= 2) {
            throw new Error('Um grupo de credenciados deve conter no mínimo dois credenciados');
        }

        // Percorre a lista de conveniados para verificar se os mesmos estao habilitados
        let items: Array<number> = req.credenciados;

        // Armazena as informacoes recuperadas dos credenciados 
        let credenciados = new Array<number>();

        if (items) {
            for (let item of items) {

                // TODO - Efetua a consulta das informacoes para verificar se o credenciado esta habilitado
                this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Buscando as informacoes do credenciado [ ${JSON.stringify(item)} ].`);

                // TODO - Verificar Se algum item nao estiver habilitado
                //if (!item.isFlagAtivo) {
                //  throw new Error('Lista de conveniados contém conveniados não habilitados.');
                //}

                credenciados.push(item as number);

            }

        }

        // TODO - Aguardar retorno do servido de credenciados
        //Verifica se todos os credenciados estao cadastrados na mesma razao de uso    
        if (credenciados) {

            // TODO - Efetua a consulta das informacoes para verificar se o credenciado esta habilitado
            this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Buscando as informacoes do credenciado  [ ${JSON.stringify(credenciados)} ].`);

            /*
            const razaoUso = credenciados[0].razaoUso;
            for (let item of credenciados) {
              if (razaoUso !== item.razaoUso) {
                new Error('Um grupo de credenciado deve conter credenciados da mesma Razão de Uso');
              }
            }
            */
        }

        let res: IncluirGrupoCredenciadoResponse = null;
        let result = null;
        let msgErr = "Erro";

        // Efetua a persistencia das informacoes
        try {

            result = await this.grupoCredenciadoService.incluirGrupoCredenciado(grupoCredenciado, credenciados);

        } catch (err) {
            this.logger.error(`${this.uuidLog}::incluirGrupoCredenciado::Erro ao efetuar a persistencia das informacoes. Request: [ ${JSON.stringify(grupoCredenciado)} ].`, err);
            msgErr = err.message;            
        }

         // TODO - Efetuar o tratamento das informacoes
         if (result) {

            res = {
                celularRepresentante: result.celularRepresentante,
                descricaoGrupoCredenciado: result.descricaoGrupoCredenciado,
                email: result.emailRepresentante,
                flagAtivo: result.flagAtivo === 1 ? true : false,
                nomeGrupoCredenciado: result.nomeGrupoCredenciado,
                sequencialGrupoCredenciado: result.sequencialGrupoCredenciado,
                serviceMessage: {
                    codigo: 0,
                    mensagemRetorno: [{
                        codigo: 0,
                        mensagem: "Sucesso"
                    }]
                }
            };

            // Log Saida
            this.logger.log(`${this.uuidLog}::incluirGrupoCredenciado::Saida`);

        } else {
            res = {
                celularRepresentante: req.celularRepresentante,
                descricaoGrupoCredenciado: req.descricaoGrupoCredenciado,
                email: req.emailRepresentante,
                flagAtivo: req.flagAtivo,
                nomeGrupoCredenciado: req.nomeGrupoCredenciado,
                sequencialGrupoCredenciado: 0,
                serviceMessage: {
                    codigo: -1,
                    mensagemRetorno: [{
                        codigo: -1,
                        mensagem: msgErr
                    }]
                }
            };
        }

        return res;

    }


    /**
     * Efetua a alteracao de um grupo de credenciados.
     * 
     * @param sequencialGrupoCredenciado 
     * @param req 
     * @returns 
     */
    public async alterarGrupoCredenciado(sequencialGrupoCredenciado: number,  req: AlterarGrupoCredenciadoRequest): Promise<AlterarGrupoCredenciadoResponse> {

        // Lof Entrada
        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Entrada`);

        // Efetua a validacao do request
        if (!req){
            throw new Error(`Request invalido [ ${JSON.stringify(req)} ]`);            
        }

        if(!sequencialGrupoCredenciado) {
            throw new Error(`Sequencial de grupo de credenciado nao informado. [ ${sequencialGrupoCredenciado} ]`);
        }

        if(!req.nomeGrupoCredenciado) {
            throw new Error(`Nome do credenciado nao informado. [ ${JSON.stringify(req)} ]`);
        }

        if(req.flagAtivo == undefined) {
            throw new Error(`Flag Ativo nao informado. [ ${JSON.stringify(req)} ]`);
        }

        // Mapeia o grupo credenciado recebido no request
        const grupoCredenciado: GrupoCredenciado = {            
            celularRepresentante: req.celularRepresentante,
            descricaoGrupoCredenciado: req.descricaoGrupoCredenciado,
            emailRepresentante: req.emailRepresentante,
            flagAtivo: req.flagAtivo ? 1 : 0,
            nomeGrupoCredenciado: req.nomeGrupoCredenciado,
            credenciados: req.credenciados,
            codigoRazaoUso: 0 // TODO Ajustar
        }

        // Verificar se existem ao menos 2 conveniados na lista
        if (!req.credenciados || req.credenciados.length <= 2) {
            throw new Error('Um grupo de credenciados deve conter no mínimo dois credenciados');
        }

        // Percorre a lista de conveniados para verificar se os mesmos estao habilitados
        let items: Array<number> = req.credenciados;

        // Armazena as informacoes recuperadas dos credenciados 
        let credenciados = new Array<number>();

        if (items) {
            for (let item of items) {

                // TODO - Efetua a consulta das informacoes para verificar se o credenciado esta habilitado
                this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Buscando as informacoes do credenciado [ ${JSON.stringify(item)} ].`);

                // TODO - Verificar Se algum item nao estiver habilitado
                //if (!item.isFlagAtivo) {
                //  throw new Error('Lista de conveniados contém conveniados não habilitados.');
                //}

                credenciados.push(item as number);

            }

        }

        // TODO - Aguardar retorno do servido de credenciados
        //Verifica se todos os credenciados estao cadastrados na mesma razao de uso    
        if (credenciados) {

            // TODO - Efetua a consulta das informacoes para verificar se o credenciado esta habilitado
            this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Buscando as informacoes do credenciado  [ ${JSON.stringify(credenciados)} ].`);

            /*
            const razaoUso = credenciados[0].razaoUso;
            for (let item of credenciados) {
              if (razaoUso !== item.razaoUso) {
                new Error('Um grupo de credenciado deve conter credenciados da mesma Razão de Uso');
              }
            }
            */
        }

        let res: AlterarGrupoCredenciadoResponse = null;
        let result = null;
        let msgErr = "Erro";

        // Efetua a persistencia das informacoes
        try {

            result = await this.grupoCredenciadoService.alterarGrupoCredenciado(sequencialGrupoCredenciado, grupoCredenciado, credenciados);

        } catch (err) {
            this.logger.error(`${this.uuidLog}::alterarGrupoCredenciado::Erro ao efetuar a persistencia das informacoes. Request: [ sequencialGrupoCredenciado: ${sequencialGrupoCredenciado}, grupoCredenciado: ${JSON.stringify(grupoCredenciado)}, credenciados: ${JSON.stringify(credenciados)} ].`, err);
            msgErr = err.message;
        }

        if (result) {
            res = {
                celularRepresentante: result.celularRepresentante,
                descricaoGrupoCredenciado: result.descricaoGrupoCredenciado,
                email: result.emailRepresentante,
                flagAtivo: result.flagAtivo === 1 ? true : false,
                nomeGrupoCredenciado: result.nomeGrupoCredenciado,
                sequencialGrupoCredenciado: result.sequencialGrupoCredenciado,
                serviceMessage: {
                    codigo: 0,
                    mensagemRetorno: [{
                        codigo: 0,
                        mensagem: "Sucesso"
                    }]
                }
            };

        } else {
            res = {
                celularRepresentante: req.celularRepresentante,
                descricaoGrupoCredenciado: req.descricaoGrupoCredenciado,
                email: req.emailRepresentante,
                flagAtivo: req.flagAtivo,
                nomeGrupoCredenciado: req.nomeGrupoCredenciado,
                sequencialGrupoCredenciado: 0,
                serviceMessage: {
                    codigo: -1,
                    mensagemRetorno: [{
                        codigo: -1,
                        mensagem: msgErr
                    }]
                }
            };
        }

        // Log Saida
        this.logger.log(`${this.uuidLog}::alterarGrupoCredenciado::Saida`);

        return res;
    
    }


    /**
     * Efetua a exclusao de um grupo de credenciados.
     * 
     * @param sequencialGrupoCredenciado 
     * @returns 
     */
    public async excluirGrupoCredenciado(sequencialGrupoCredenciado: number): Promise<ExcluirGrupoCredenciadoResponse> {

        // Lof Entrada
        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Entrada`);

        // Efetua a validacao do request
        if(!sequencialGrupoCredenciado) {
            throw new Error(`Sequencial de grupo de credenciado nao informado. [ ${sequencialGrupoCredenciado} ]`);
        }

        let res: ExcluirGrupoCredenciadoResponse = null;
        let result = null;
        let msgErr = "Erro";

        // Efetua a persistencia das informacoes
        try {

            await this.grupoCredenciadoService.excluirGrupoCredenciado(sequencialGrupoCredenciado);

            res = {
                serviceMessage: {
                    codigo: 0,
                    mensagemRetorno: [{
                        codigo: 0,
                        mensagem: "Sucesso"
                    }]
                }
            };
           
        } catch (err) {
            this.logger.error(`${this.uuidLog}::excluirGrupoCredenciado::Erro ao efetuar a persistencia das informacoes. Request [ ${sequencialGrupoCredenciado} ].`, err);
            
            res = {
                serviceMessage: {
                    codigo: -1,
                    mensagemRetorno: [{
                        codigo: -1,
                        mensagem: err.message
                    }]
                }
            };
        }

        // Log Saida
        this.logger.log(`${this.uuidLog}::excluirGrupoCredenciado::Saida`);

        return res;
    
    }
    
    /**
     * Efetua a pesquisa de grupos de credenciados com base nos parametros.
     * 
     * @param nomeCredenciado 
     * @param flagAtivo 
     * @param credenciados 
     * @param codigoRecurso 
     * @param codigoRazaoUso 
     * @returns 
     */
    public async pesquisarGrupoCredenciado(nomeCredenciado?: string, flagAtivo?: boolean, credenciados?: Array<number>, codigoRecurso?: number, codigoRazaoUso?: number): Promise<PesquisarGrupoCredenciadoResponse> {

        // Lof Entrada
        this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Entrada`);

        let msgErr = "Erro";
        let gruposRecurso: Array<number>;        
        let gruposResult: Array<GrupoCredenciadoEntity>;

        let res: PesquisarGrupoCredenciadoResponse = null;
        let gruposRetorno: Array<GrupoCredenciado> = new Array();

        // Verifica se a consulta devera ser efetuada por codigo de Recurso
        if(codigoRecurso){

            // Efetuar a busca no servico de codigo de recurso
            // O servico de busca de grupos por codigo de recurso, devera retornar uma lista com os ids dos grupos de credenciado
            // Alista de grupos de credenciado retornada deverá ser utilizada como parametro da pesquisa para obter o filtro dos itens conforme grupos credenciados
            // retornados do servico de recurso

            try {

                //gruposRecurso = await codigoRecurso.obterGruposCredenciadosPorRecurso(codigoRecurso);
    
            } catch (err) {
                this.logger.error(`${this.uuidLog}::pesquisarGrupoCredenciado::Erro ao efetuar a busca dos grupos de credenciado por recurso. Request: [ ${codigoRecurso} ]`, err);
                msgErr = err.message;
            }

        }
        
        // Efetua a pesquisa das informações de grupo de credenciados
        try {

            // TODO Expor a paginacao
            gruposResult = await this.grupoCredenciadoService.pesquisarGrupoCredenciado(nomeCredenciado, flagAtivo, credenciados, codigoRazaoUso, gruposRecurso, 1, 100);

        } catch (err) {
            this.logger.error(`${this.uuidLog}::pesquisarGrupoCredenciado::Erro ao efetuar a pesquisa das informacoes de grupo. Request: [nomeCredenciado: ${nomeCredenciado}, flagAtivo: ${flagAtivo}, credenciados: ${credenciados}, codigoRazaoUso: ${codigoRazaoUso}, gruposRecurso: ${gruposRecurso} ]`, err);
            msgErr = err.message;
        }

        if (gruposResult) {

            for(const grupoEntity of gruposResult){

                let credenciadosGrupo: Array<number>;

                try {

                    credenciadosGrupo = await this.grupoCredenciadoService.obterIdsCredenciados(grupoEntity.sequencialGrupoCredenciado);
        
                } catch (err) {
                    this.logger.error(`${this.uuidLog}::pesquisarGrupoCredenciado::Erro ao efetuar a pesquisa das informacoes de credenciado. Request: [ ${grupoEntity.sequencialGrupoCredenciado} ]`, err);
                    msgErr = err.message;
                }
                
                gruposRetorno.push({
                    celularRepresentante: grupoEntity.celularRepresentante,
                    codigoRazaoUso: grupoEntity.codigoTipoRazaoUso,
                    credenciados: credenciadosGrupo,
                    descricaoGrupoCredenciado: grupoEntity.descricaoGrupoCredenciado,
                    emailRepresentante: grupoEntity.emailRepresentante,
                    flagAtivo: grupoEntity.flagAtivo,
                    nomeGrupoCredenciado: grupoEntity.nomeGrupoCredenciado,
                    sequencialGrupoCredenciado: grupoEntity.sequencialGrupoCredenciado
                })    
                
            }

            // Prepara o Response
            res = {
                grupos: gruposRetorno,
                serviceMessage: {
                    codigo: 0,
                    mensagemRetorno: [{
                        codigo: 0,
                        mensagem: "Sucesso"
                    }]
                }
            };

        } else {

            // Prepara o Response
            res = {
                grupos: gruposRetorno,
                serviceMessage: {
                    codigo: -1,
                    mensagemRetorno: [{
                        codigo: -1,
                        mensagem: msgErr
                    }]
                }
            };
        }

        // Log Saida
        this.logger.log(`${this.uuidLog}::pesquisarGrupoCredenciado::Saida`);

        return res;
    
    }


    /**
     * Obtem os codigos de grupo de credenciados associados a razao de uso informada nos parametros.
     * 
     * @param codigoRazaoUso 
     * @returns 
     */
    public async obterGrupoCredenciadoRazaoUso(codigoRazaoUso: number): Promise<ObterGrupoCredenciadoRazaoUsoResponse> {

        // Lof Entrada
        this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Entrada`);

        // Efetua a validacao do request
        if(!codigoRazaoUso) {
            throw new Error(`Codigo de razao de uso nao informado. [ ${codigoRazaoUso} ]`);
        }

        let res: ObterGrupoCredenciadoRazaoUsoResponse = null;
        let result = null;
        let msgErr = "Erro";

        // Efetua a persistencia das informacoes
        try {

            let retSequencialGrupos: Array<number> = await this.grupoCredenciadoService.obterGrupoCredenciadoRazaoUso(codigoRazaoUso);

            res = {
                sequencialGrupos: retSequencialGrupos,
                serviceMessage: {
                    codigo: 0,
                    mensagemRetorno: [{
                        codigo: 0,
                        mensagem: "Sucesso"
                    }]
                }
            };
           
        } catch (err) {
            
            this.logger.error(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Erro ao efetuar a persistencia das informacoes Request: [ ${codigoRazaoUso} ].`, err);
            
            res = {
                sequencialGrupos: new Array(),
                serviceMessage: {
                    codigo: -1,
                    mensagemRetorno: [{
                        codigo: -1,
                        mensagem: err.message
                    }]
                }
            };
        }

        // Log Saida
        this.logger.log(`${this.uuidLog}::obterGrupoCredenciadoRazaoUso::Saida`);

        return res;
    
    }

}
