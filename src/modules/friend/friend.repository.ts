import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class FriendRepository {
    constructor(
        private readonly prisma: PrismaService 
    ) {}

    public async getFriendExist(sender_id:string,receiver_id:string){
        return await this.prisma.friendRequest.findUnique({
            where:{
                sender_id_receiver_id:{
                    sender_id:sender_id,
                    receiver_id:receiver_id
                }
            }
        })
    }
    public async addFriend(sender_id:string,receiver_id:string){
        return await this.prisma.friendRequest.create({
            data: {
                sender_id:sender_id,
                receiver_id:receiver_id
            }
        })
    }
}