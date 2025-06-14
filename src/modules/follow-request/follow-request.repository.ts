import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { FollowRequestDto } from "./follow-request.dto";

@Injectable()
export class FollowRequestRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async findRequest(receiver_id: string, sender_id: string) {
        return await this.prisma.followRequest.findFirst({
            where: {
                sender_id: sender_id,
                receiver_id: receiver_id
            }
        })
    }
    
    public async sendFollowRequest(receiver_id: string, sender_id: string) {
        return await this.prisma.followRequest.create({
            data: {
                sender_id: sender_id,
                receiver_id: receiver_id
            }
        })
    }

    public async deleteRequest(sender_id: string, receiver_id: string) {
        return await this.prisma.followRequest.delete({
            where: {
                sender_id_receiver_id: {
                    sender_id: sender_id,
                    receiver_id: receiver_id
                }
            }
        })
    }
}