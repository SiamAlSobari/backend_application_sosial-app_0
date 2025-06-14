import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserSigInDto, UserSigUpDto } from "./user.dto";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(
        private readonly prisma : PrismaService
    ) {
    }

    public async signUp(dto:UserSigUpDto, hashedPassword:string){
        return  this.prisma.user.create({
            data:{
                email:dto.email,
                password:hashedPassword,
                profile:{
                    create:{
                        user_name:dto.user_name,
                        name:dto.name
                    }
                }
            },
            include:{profile:true}
        })
    }

    public async deleteAccount(id:string) {
        return this.prisma.user.delete({where:{id:id}})
    }


    public async findByEmail(email: string) {
        return  this.prisma.user.findUnique({
            where:{
                email:email
            }
        })
    }

    public async getAllUsers(user_id:string) {
        return this.prisma.user.findMany({
            where:{
                NOT:{id:user_id},
                Followers:{
                    none:{followerId:user_id}
                },
                receiverRequest:{
                    none:{sender_id:user_id}
                }
            },
            include:{profile:true}
        })
    }
}