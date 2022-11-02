import { Module } from '@nestjs/common';
import { UserGroupService } from '../service/user-group.service';
import { UserGroupController } from '../controller/user-group.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [UserGroupService],
  controllers: [UserGroupController],
  exports: [],
})
export class UserGroupModule {}
