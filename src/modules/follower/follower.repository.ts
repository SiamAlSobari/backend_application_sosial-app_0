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

    public async findFollowers(user_id:string){
        return await this.prisma.follower.findMany({
            where: {
                followingId:user_id,
                NOT:{
                    followerId:user_id
                },
            },
            include:{
                follower:{
                    include:{
                        profile:true
                    }
                }
            },
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