import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeDto } from './like.dto';
import { NotificationRepository } from '../notification/notification.repository';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly notificationRepository: NotificationRepository
    ) {}

    public async createLikePost(user_id:string,dto:LikeDto) {
        const like = await this.likeRepository.createLikePost(user_id,dto)
        const targetData = await this.likeRepository.getLikePostNotification(like.post_id);
        
        // membuat notifikasi jika post yang di like bukan milik user yang melakukan like
        // jika post yang di like milik user yang melakukan like, maka tidak perlu membuat not
        if (targetData && targetData.post.user_id !== user_id) {
            await this.notificationRepository.createLikeNotification(
                user_id,
                targetData.post.user_id,
                targetData.user.profile?.name ?? ''
            );
        }
        return like;
    }

    public async deleteLikePost(user_id:string,dto:LikeDto) {
        return this.likeRepository.deleteLikePost(user_id,dto)
    }
}
