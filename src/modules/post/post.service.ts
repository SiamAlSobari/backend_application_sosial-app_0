import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { CreatePostDto } from './post.dto';
import { MediaRepository } from '../media/media.repository';
import { MediaService } from '../media/media.service';
import { MediaDto } from '../media/media.dto';

@Injectable()
export class PostService {
    constructor(
        private readonly repository:PostRepository,
        private readonly mediaService:MediaService
    ) {}

    public async createPost(dto:CreatePostDto,user_id:string,files:Express.Multer.File[],base_url:string){ 
        const post = await this.repository.createPost(dto.caption,user_id)
        if(!files || files.length == 0){
            dto.media = []
        }else{
            dto.media = files.map((file)=>{
                const media = new MediaDto()
                media.url = `${base_url}/upload/${file.filename}`
                media.type = file.mimetype
                return media
            })
        }
        if(dto.media && dto.media.length > 0){
            const media = await this.mediaService.saveMediaToPost(post.id,dto.media)
        }
        return post
    }


    public async getPostsMe(user_id:string){
        return await this.repository.getPostsMe(user_id)
    }

    public async getAllPostsByDesc(){
        return await this.repository.getAllPostsByDesc()
    }
}
