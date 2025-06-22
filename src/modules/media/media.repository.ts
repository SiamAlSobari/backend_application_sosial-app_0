import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MediaDto } from './media.dto';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async mediaSave(post_id: string, mediaItem: MediaDto) {
    return await this.prisma.media.create({
      data: {
        post_id: post_id,
        url: mediaItem.url,
        type: mediaItem.type,
      },
    });
  }

  public async updateMedia(id: string, mediaItem: MediaDto) {
    return await this.prisma.media.update({
      where: {
        id: id,
      },
      data: {
        url: mediaItem.url,
        type: mediaItem.type,
      },
    });
  }

  async mediaUpdate(id: string, data: { url: string; type: string }) {
    return this.prisma.media.update({
      where: { id },
      data,
    });
  }

  async mediaDelete(id: string) {
    return this.prisma.media.delete({
      where: { id },
    });
  }
}
