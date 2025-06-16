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
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (existingRequest) {
            throw new HttpException("Request sudah ada", HttpStatus.CONFLICT)
        }
        return this.repository.sendFollowRequest(dto.receiver_id, sender_id)
    }

    public async acceptFollowRequest(dto: FollowRequestDto, sender_id: string) {
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (!existingRequest) {
            throw new HttpException("Request tidak ada", HttpStatus.CONFLICT)
        }
        await this.repository.deleteRequest(existingRequest.id)
        return this.followerRepository.createFollower(dto.receiver_id, sender_id)
    }

    public async rejectFollowRequest(dto: FollowRequestDto, sender_id: string) {
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (!existingRequest) {
            throw new HttpException("Request tidak ada", HttpStatus.NOT_FOUND)
        }
        return this.repository.deleteRequest(existingRequest.id)
    }
}
