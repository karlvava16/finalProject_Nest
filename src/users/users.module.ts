import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { PoliciesGuard } from "../guards/policies.guard";
import { CaslAbilityFactory } from "../casl/casl-ability.factory";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, PoliciesGuard,
    CaslAbilityFactory,],
  exports: [UsersService],
})
export class UsersModule {}
