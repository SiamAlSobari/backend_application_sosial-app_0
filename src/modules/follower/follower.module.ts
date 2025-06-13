import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { FollowerRepository } from './follower.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FollowerController],
  providers: [FollowerService, FollowerRepository,JwtService],
})
export class FollowerModule {}
