import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { MediaDto } from "./media.dto";

@Injectable()
export class MediaRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async mediaSave(post_id:string,mediaItem:MediaDto){
        return this.prisma.media.create({
            data:{
                post_id:post_id,
                url:mediaItem.url,
                type:mediaItem.type
            }
        })
    }
}