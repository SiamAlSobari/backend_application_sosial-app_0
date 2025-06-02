import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserSigUpDto } from "./user.dto";
import { UserAbstractRepository } from "./user.abstract.repository";

@Injectable()
export class UserRepository  extends UserAbstractRepository{
    constructor(
        private readonly prisma : PrismaService
    ) {
        super()
    }
    async signUp(dto:UserSigUpDto, hashedPassword:string): Promise<any> {
        return await this.prisma.user.create({
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

    async findByEmail(email: string): Promise<any> {
        return await this.prisma.user.findUnique({
            where:{
                email:email
            }
        })
    }
}