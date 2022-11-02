import { Module } from '@nestjs/common';
import { GrupoCredenciadoController } from '../controller/grupo.credenciado.controller';
import { GrupoCredenciadoBusiness } from 'src/business/grupo.credenciado.business';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoCredenciadoEntity } from '../model/grupo.credenciado.entity';
import { CredenciadoEntity } from 'src/model/credenciado.entity';
import { GrupoCredenciadoService } from 'src/service/grupo.credenciado.service';
import { GrupoCredCredEntity } from 'src/model/grupo.cred.cred.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoCredenciadoEntity,CredenciadoEntity, GrupoCredCredEntity])],
  controllers: [GrupoCredenciadoController],
  providers: [GrupoCredenciadoService, GrupoCredenciadoBusiness]
})
export class GrupoCredenciadoModule {}
