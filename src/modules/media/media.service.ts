import { Injectable } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import { MediaDto } from './media.dto';

@Injectable()
export class MediaService {
  constructor(private readonly repository: MediaRepository) {}

  public async saveMediaToPost(post_id: string, mediaItems: MediaDto[]) {
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
    const createMedia = await Promise.all(
      mediaItems.map(async (mediaItem) => {
        const m = await this.repository.mediaSave(post_id, mediaItem);
        return {
          id: m.id,
          url: m.url,
          type: m.type,
          post_id,
        };
      }),
    );
    return createMedia;
  }

  public async updateMediaForPost(
    post_id: string,
    options: {
      mediaToAdd?: MediaDto[];
      mediaToDelete?: string[];
    },
  ) {
    const result: {
      added: MediaDto[];
      deleted: {
        id: string;
        url: string;
        type: string | null;
        post_id: string;
      }[];
    } = {
      added: [],
      deleted: [],
    };

    //menambah media baru / image baru / video baru
    if (options.mediaToAdd?.length) {
      const added = await Promise.all(
        options.mediaToAdd.map(
          (media) =>
            this.repository.mediaSave(post_id, media) as Promise<MediaDto>,
        ),
      );
      result.added = added;
    }


    //menghapus media
    if (options.mediaToDelete?.length) { //mediaDeleted bersifat array karena DTO makanya harus di promise
      const deleted = await Promise.all(
        options.mediaToDelete.map((id) => this.repository.mediaDelete(id)), //pda dasarnya ini itu id dari dto (kalo dia normal itu bukan array) jadi si medidaToDelete itu sebenarnya adalah string
      );
      result.deleted = deleted;
    }

    return result;
  }
}
