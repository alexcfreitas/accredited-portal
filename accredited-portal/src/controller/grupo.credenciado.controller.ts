import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  ValidationPipe,
  Put,
  HttpCode,
  Injectable,
} from '@nestjs/common';
import { GrupoCredenciadoBusiness } from 'src/business/grupo.credenciado.business';
import { GrupoCredenciadoResponse } from 'src/api-doc/response/grupo.credenciado.response';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GrupoCredenciadoService } from 'src/service/grupo.credenciado.service';
import { IncluirGrupoCredenciadoRequest } from 'src/api-doc/request/incluir.grupo.credenciado.request';
import { IncluirGrupoCredenciadoResponse } from 'src/api-doc/response/incluir.grupo.credenciado.response';
import { GrupoCredenciadoEntity } from 'src/model/grupo.credenciado.entity';
import { AlterarGrupoCredenciadoResponse } from 'src/api-doc/response/alterar.grupo.credenciado.response';
import { AlterarGrupoCredenciadoRequest } from 'src/api-doc/request/alterar.grupo.credenciado.request';
import { v4 as uuidv4 } from 'uuid';
import { BaseController } from 'src/controller/base.controller';
import { ExcluirGrupoCredenciadoResponse } from 'src/api-doc/response/excluir.grupo.credenciado.response';
import { PesquisarGrupoCredenciadoRequest } from 'src/api-doc/request/pesquisar.grupo.credenciado.request';
import { PesquisarGrupoCredenciadoResponse } from 'src/api-doc/response/pesquisar.grupo.credenciado.response';
import { ObterGrupoCredenciadoRazaoUsoResponse } from 'src/api-doc/response/obter.grupo.credenciado.razao.uso.response';
import { Public } from 'nestjs-keycloak-admin';

@Injectable()
@Controller('grupo-credenciado')
export class GrupoCredenciadoController extends BaseController {
  private readonly logger = new Logger(GrupoCredenciadoController.name);

  constructor(
    private grupoCredenciadoService: GrupoCredenciadoService,
    private grupoCredenciadoBusiness: GrupoCredenciadoBusiness,
  ) {
    super();
  }

  /**
   * Efetua a criacao do identificador da execucao nos logs.
   *
   */
  async createLogUuid(): Promise<void> {
    this.uuidLog = uuidv4();
    this.grupoCredenciadoBusiness.uuidLog = this.uuidLog;
    this.grupoCredenciadoService.uuidLog = this.uuidLog;
  }

  /**
   * Efetua a inclusao de um grupo de credenciado.
   *
   * @param body
   * @returns
   */
  @ApiCreatedResponse({
    type: IncluirGrupoCredenciadoResponse,
  })
  @Post()
  async incluirGrupoCredenciado(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: IncluirGrupoCredenciadoRequest,
  ): Promise<IncluirGrupoCredenciadoResponse> {
    // Identifica a execucao do fluxo nos logs
    await this.createLogUuid();

    return await this.grupoCredenciadoBusiness.incluirGrupoCredenciado(body);
  }

  /**
   * Efetua a alteracao de um grupo de credenciado.
   *
   * @param sequencialGrupoCredenciado
   * @param body
   * @returns
   */
  @Put(':sequencialGrupoCredenciado')
  async alterarGrupoCredenciado(
    @Param('sequencialGrupoCredenciado') sequencialGrupoCredenciado: number,
    @Body() body: AlterarGrupoCredenciadoRequest,
  ): Promise<AlterarGrupoCredenciadoResponse> {
    // Identifica a execucao do fluxo nos logs
    await this.createLogUuid();

    return await this.grupoCredenciadoBusiness.alterarGrupoCredenciado(
      sequencialGrupoCredenciado,
      body,
    );
  }

  /**
   * Efetua a exclusao de um grupo de credenciado.
   *
   * @param sequencialGrupoCredenciado
   * @returns
   */
  @Delete(':sequencialGrupoCredenciado')
  @HttpCode(204)
  async excluirGrupoCredenciado(
    @Param('sequencialGrupoCredenciado') sequencialGrupoCredenciado: number,
  ): Promise<ExcluirGrupoCredenciadoResponse> {
    // Identifica a execucao do fluxo nos logs
    await this.createLogUuid();

    return await this.grupoCredenciadoBusiness.excluirGrupoCredenciado(
      sequencialGrupoCredenciado,
    );
  }

  /**
   * Efetua a pesquisa de grupos de credenciados.
   *
   * @param body
   * @returns
   */
  @ApiCreatedResponse({
    type: PesquisarGrupoCredenciadoResponse,
  })
  @Post('/pesquisarGrupoCredenciado')
  @Public()
  async pesquisarGrupoCredenciado(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: 422,
      }),
    )
    body: PesquisarGrupoCredenciadoRequest,
  ): Promise<PesquisarGrupoCredenciadoResponse> {
    // Identifica a execucao do fluxo nos logs
    await this.createLogUuid();

    return await this.grupoCredenciadoBusiness.pesquisarGrupoCredenciado(
      body.nomeGrupoCredenciado !== undefined
        ? body.nomeGrupoCredenciado
        : null,
      body.flagAtivo !== undefined ? body.flagAtivo : null,
      body.credenciados !== undefined && body.credenciados.length > 0
        ? body.credenciados
        : null,
      body.codigoRecurso !== undefined ? body.codigoRecurso : null,
      body.codigoRazaoUso !== undefined ? body.codigoRazaoUso : null,
    );
  }

  /**
   * Efetua a busca os grupos de credenciado cadastrados.
   *
   * @returns
   */
  @Get()
  async index(): Promise<GrupoCredenciadoEntity[]> {
    return this.grupoCredenciadoService.getAll();
  }

  /**
   * Efetua a busca de um grupo de credenciado por meio do sequencial.
   * @param sequencialGrupoCredenciado
   * @returns
   */
  @ApiOkResponse({
    type: GrupoCredenciadoResponse,
  })
  @Get(':sequencialGrupoCredenciado')
  show(
    @Param('sequencialGrupoCredenciado') sequencialGrupoCredenciado: number,
  ): Promise<GrupoCredenciadoEntity> {
    return this.grupoCredenciadoService.show(sequencialGrupoCredenciado);
  }

  /**
   * Efetua a busca dos codigos de grupo de credenciados associados a uma razao de uso.
   * @param codigoRazaoUso
   * @returns
   */
  @ApiOkResponse({
    type: ObterGrupoCredenciadoRazaoUsoResponse,
  })
  @Get('/razao-uso/:codigoRazaoUso')
  obterIdsGrupoCredenciadoPorRazaoUso(
    @Param('codigoRazaoUso') codigoRazaoUso: number,
  ): Promise<ObterGrupoCredenciadoRazaoUsoResponse> {
    return this.grupoCredenciadoBusiness.obterGrupoCredenciadoRazaoUso(
      codigoRazaoUso,
    );
  }
}
