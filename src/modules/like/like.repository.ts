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

    public async getLikePostNotification(post_id:string){
        return await this.prisma.like.findFirst({
            where:{
                post_id: post_id
            },
            include:{
                post:{
                    select:{
                        user_id: true,
                    }
                },
                user:{
                    include:{
                        profile: {
                            select: {
                                id:true,
                                name: true,
                            }
                        }
                    }
                }
            }
        })
    }
}