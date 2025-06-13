import { Module } from '@nestjs/common';
import { FollowRequestController } from './follow-request.controller';
import { FollowRequestService } from './follow-request.service';
import { FollowRequestRepository } from './follow-request.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FollowRequestController],
  providers: [FollowRequestService,FollowRequestRepository,JwtService]
})
export class FollowRequestModule {}
