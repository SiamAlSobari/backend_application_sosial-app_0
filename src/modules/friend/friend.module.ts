import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendRepository } from './friend.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [FriendService,FriendRepository,JwtService],
  controllers: [FriendController]
})
export class FriendModule {}
