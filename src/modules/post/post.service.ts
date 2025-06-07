import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './post.dto';
import { MediaRepository } from '../media/media.repository';
import { MediaService } from '../media/media.service';

@Injectable()
export class PostService {
    constructor(
        private readonly repository:PostRepository,
        private readonly mediaService:MediaService
    ) {}

    public async createPost(dto:CreatePostDto,user_id:string) {
        const post = await this.repository.createPost(dto.caption,user_id)

        if(dto.media && dto.media.length > 0){
            const media = await this.mediaService.saveMediaToPost(post.id,dto.media)
        }

        return post
    }
}
