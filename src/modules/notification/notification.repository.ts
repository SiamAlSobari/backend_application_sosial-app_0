import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createLikeNotification(sender_id:string,receiver_id:string,post_name_user:string){
        return await this.prisma.notification.create({
            data: {
                type: 'like',
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: `${post_name_user} menyukai postingan kamu`,
            }
        })
    }

    public async createFollowRequestNotification(sender_id:string,receiver_id:string,post_name_user:string){
        return await this.prisma.notification.create({
            data: {
                type: 'follow_request',
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: `${post_name_user} mengajak kamu untuk follow`,
            }
        })
    }
}