import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateProfileDto } from "./profile.dto";
import multer from "multer";

@Injectable()
export class ProfileRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async updateCoverProfile(userId:string,file:Express.Multer.File,base_url:string){
        return await this.prisma.profile.update({
            where:{
                user_id:userId
            },
            data:{
                cover_image:`${base_url}/upload/${file.filename}`
            }
        })
    }

    public async getProfilMe(user_id:string) {
        return await this.prisma.profile.findFirst({
            where: {
                user_id: user_id
            }
        })
    }

    public async updateProfileAvatar(user_id:string,file:Express.Multer.File,base_url:string) {
        return await this.prisma.profile.update({
            where: {
                user_id
            },
            data: {
                avatar_image:`${base_url}/upload/${file.filename}`
            }
        })
    }
}