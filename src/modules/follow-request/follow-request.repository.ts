import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FollowRequestRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async findRequest(receiver_id: string, sender_id: string) {
        return await this.prisma.followRequest.findFirst({
            where: {
                sender_id: receiver_id, // ini adalah dimana saya sebagai penerima
                receiver_id: sender_id // ini adalah dimana penerima sebagai pengirim
                //kurang lebih itu dimana saya sebagai penerima dan dia sebagi pengirim
            }
        })
    }
    
    public async sendFollowRequest(receiver_id: string, sender_id: string) {
        return await this.prisma.followRequest.create({
            data: {
                sender_id: sender_id,
                receiver_id: receiver_id
            },
            include:{
                sender:{
                    include:{
                        profile: {
                            select: {
                                id: true,
                                name: true,
                            }
                        }
                    }
                }
            }
        })
    }

    public async deleteRequest(id: string) {
        return await this.prisma.followRequest.delete({
            where: {
                id: id
            }
        })
    }
}