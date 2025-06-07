import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./post.dto";

@Injectable()
export class PostRepository {
    constructor(
        private readonly prisma:PrismaService
    ) {}

    public async createPost(caption:string,user_id:string) {
        return await this.prisma.post.create({
            data: {
                user_id:user_id,
                caption:caption,
            }
        })
    }

    public async getPostsMe(user_id:string) {
        return await this.prisma.post.findMany({
            where: {
                user_id: user_id
            },
            include: {
                media: true
            }
        })
    }
}
