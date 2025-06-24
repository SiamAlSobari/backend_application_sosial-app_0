import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { LikeDto } from './like.dto';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository
    ) {}

    public async createLikePost(user_id:string,dto:LikeDto) {
        const like = await this.likeRepository.createLikePost(user_id,dto)
        
        return like;
    }

    public async deleteLikePost(user_id:string,dto:LikeDto) {
        return this.likeRepository.deleteLikePost(user_id,dto)
    }
}
