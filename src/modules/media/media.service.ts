import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaDto } from './media.dto';
import { MediaEnum } from 'src/common/enum/media.enum';

@Injectable()
export class MediaService {
    constructor(
        private readonly repository:MediaRepository
    ) {}

    public async saveMediaToPost(
        post_id:string,
        mediaItems:MediaDto[]
    ){
        // const createMedia : {id:string,url:string,type:MediaEnum,post_id:string}[] = []
        // for (const mediaItem of mediaItems){
        //     const m = await this.repository.mediaSave(post_id,mediaItem)
        //     createMedia.push({
        //         id:m.id,
        //         url:m.url,
        //         type:m.type as MediaEnum,
        //         post_id
        //     })
        // }
        const createMedia = await Promise.all(mediaItems.map(async (mediaItem)=>{
            const m = await this.repository.mediaSave(post_id,mediaItem)
            return {
                id:m.id,
                url:m.url,
                type:m.type as MediaEnum,
                post_id
            }
        }))
        return createMedia
    }
}
