import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { QueryFollowerDto } from "./follower.dto";

@Injectable()
export class FollowerRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createFollower(receiver_id: string, sender_id: string) {
        return await this.prisma.follower.createMany({
            data: [
                {followerId: sender_id, followingId: receiver_id},
                {followerId: receiver_id, followingId: sender_id}
            ]
        })
    }

    public async findFollowers(user_id,query:QueryFollowerDto){
        return await this.prisma.follower.findMany({
            where: {
                followingId:user_id,
                NOT:{
                    followerId:user_id
                },
                follower:{
                    profile:{
                        name:{
                            contains:query.search.toLowerCase() || "",
                        }
                    }
                }
            },
            include:{
                follower:{
                    include:{
                        profile:true
                    }
                }
            },
            take:Number(query.limit),
            skip:(Number(query.page)-1)*Number(query.limit)
        })
    }

    public async totalFollowers(user_id){
        return await this.prisma.follower.count({
            where: {
                followingId:user_id,
                NOT:{
                    followerId:user_id
                },
            }
        })
    }
}