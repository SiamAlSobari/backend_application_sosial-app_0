import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { JwtService } from '@nestjs/jwt';
import { NotificationRepository } from '../notification/notification.repository';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikeRepository,NotificationRepository,JwtService]
})
export class LikeModule {}
