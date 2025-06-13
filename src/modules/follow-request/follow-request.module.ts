import { Module } from '@nestjs/common';
import { FollowRequestController } from './follow-request.controller';
import { FollowRequestService } from './follow-request.service';

@Module({
  controllers: [FollowRequestController],
  providers: [FollowRequestService]
})
export class FollowRequestModule {}
