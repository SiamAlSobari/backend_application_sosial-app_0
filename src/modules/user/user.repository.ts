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

    async signUp(dto:UserSigUpDto, hashedPassword:string){
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


    async findByEmail(email: string) {
        return  this.prisma.user.findUnique({
            where:{
                email:email
            }
        })
    }
}