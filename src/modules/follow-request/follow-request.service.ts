import { Injectable } from '@nestjs/common';
import { FollowRequestRepository } from './follow-request.repository';

@Injectable()
export class FollowRequestService {
    constructor(
        private readonly repository: FollowRequestRepository
    ) {}
}
