import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FollowRequestRepository } from './follow-request.repository';
import { FollowRequestDto } from './follow-request.dto';
import { FollowerRepository } from '../follower/follower.repository';

@Injectable()
export class FollowRequestService {
    constructor(
        private readonly repository: FollowRequestRepository,
        private readonly followerRepository: FollowerRepository
    ) {}
    
    public async sendFollowRequest(dto: FollowRequestDto, sender_id: string) {
        if(dto.receiver_id === sender_id){
            throw new HttpException("Tidak bisa follow diri sendiri",HttpStatus.BAD_REQUEST)
        }
        return this.repository.sendFollowRequest(dto.receiver_id, sender_id)
    }

    public async acceptFollowRequest(dto: FollowRequestDto, sender_id: string) {
        await this.repository.deleteRequest(sender_id, dto.receiver_id)
        return this.followerRepository.createFollower(dto.receiver_id, sender_id)
    }
}
