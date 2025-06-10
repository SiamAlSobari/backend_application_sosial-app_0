import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UpdateProfileDto } from "./profile.dto";

@Injectable()
export class ProfileRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async updateProfile(dto:UpdateProfileDto,userId:string){
        return await this.prisma.profile.update({
            where:{
                user_id:userId
            },
            data:{
                ...dto
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
}