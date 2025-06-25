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
                type: 'post_like',
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
                message: `${post_name_user} mengirim permintaan mengikuti kamu`,
            }
        })
    }

    public async createFollowAcceptedNotification(sender_id:string,receiver_id:string,post_name_user:string){
        return await this.prisma.notification.create({
            data: {
                type: 'follow_accept',
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: `${post_name_user} menerima permintaan mengikuti kamu`,
            }
        })
    }

    public async createFollowRejectedNotification(sender_id:string,receiver_id:string,post_name_user:string){
        return await this.prisma.notification.create({
            data: {
                type: 'follow_reject',
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: `${post_name_user} menolak permintaan mengikuti kamu`,
            }
        })
    }
    public async createDefaultCommentNotification(sender_id:string,receiver_id:string,content:string,name_user:string){
        return await this.prisma.notification.create({
            data: {
                type: 'post_comment',
                sender_id: sender_id,
                receiver_id: receiver_id,
                message: `${name_user} mengomentari postingan kamu: "${content}"`,
            }
        })
    }

    
}