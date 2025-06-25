import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FollowRequestRepository } from './follow-request.repository';
import { FollowRequestDto } from './follow-request.dto';
import { FollowerRepository } from '../follower/follower.repository';
import { NotificationRepository } from '../notification/notification.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class FollowRequestService {
    constructor(
        private readonly repository: FollowRequestRepository,
        private readonly followerRepository: FollowerRepository,
        private readonly notificationRepository: NotificationRepository,
        private readonly userRepository: UserRepository
    ) {}
    
    public async sendFollowRequest(dto: FollowRequestDto, sender_id: string) {
        if(dto.receiver_id === sender_id){
            throw new HttpException("Tidak bisa follow diri sendiri",HttpStatus.BAD_REQUEST)
        }
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (existingRequest) {
            throw new HttpException("Request sudah ada", HttpStatus.CONFLICT)
        }
        const createRequest = await this.repository.sendFollowRequest(dto.receiver_id, sender_id)
        const createFolloweRequestNotificationn = await this.notificationRepository.createFollowRequestNotification(
            sender_id,
            dto.receiver_id,
            createRequest.sender.profile?.name ?? ''
        )
        return {
            message:"Permintaan berhasil dikirim",
            data:createRequest
        }
    }

    public async acceptFollowRequest(dto: FollowRequestDto, sender_id: string) {
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (!existingRequest) {
            throw new HttpException("Request tidak ada", HttpStatus.CONFLICT)
        }
        await this.repository.deleteRequest(existingRequest.id)
        const createFollower = await this.followerRepository.createFollower(dto.receiver_id, sender_id)

        //mencari user yang mengirim menerima permintaan
        // Pastikan sender_id adalah user yang menerima permintaan
        const sender = await this.userRepository.getUserById(sender_id);
        if (!sender) {
            throw new HttpException("Pengirim tidak ditemukan", HttpStatus.NOT_FOUND)
        }
        const createFollowAcceptedNotification = await this.notificationRepository.createFollowAcceptedNotification(
            sender_id,
            dto.receiver_id,
            sender.profile?.name ?? ''

        )
        return {
            message:"Permintaan berhasil diterima",
            data:createFollower
        }
    }

    public async rejectFollowRequest(dto: FollowRequestDto, sender_id: string) {
        const existingRequest = await this.repository.findRequest(dto.receiver_id, sender_id)
        if (!existingRequest) {
            throw new HttpException("Request tidak ada", HttpStatus.NOT_FOUND)
        }
        const deleteRequest = await this.repository.deleteRequest(existingRequest.id)
        return {
            message:"Permintaan berhasil ditolak",
            data:deleteRequest
        }
    }
}
