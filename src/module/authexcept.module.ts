import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthExceptService } from '../service/authexcept.service';
import { AuthExceptController } from '../controller/authexcept.controller';
import { AuthExcept } from '../model/authexcept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthExcept])],
  providers: [AuthExceptService],
  controllers: [AuthExceptController],
  exports: [],
})
export class AuthExceptModule {}
