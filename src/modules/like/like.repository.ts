import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LikeDto } from "./like.dto";

@Injectable()
export class LikeRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createLikePost(user_id:string,dto:LikeDto) {
        return await this.prisma.like.create({
            data: {...dto,user_id:user_id}
        })
    }

    public async deleteLikePost(user_id:string,dto:LikeDto) {
        return await this.prisma.like.deleteMany({
            where: {...dto,user_id:user_id}
        })
    }
}