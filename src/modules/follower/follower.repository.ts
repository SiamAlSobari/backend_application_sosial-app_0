import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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

    public async findFollower(receiver_id: string, sender_id: string) {
        return await this.prisma.follower.findFirst({
            where: {
                followerId: sender_id,
                followingId: receiver_id
            }
        })
    }
}