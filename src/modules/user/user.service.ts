import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSigUpDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository
    ) {}

    public async signUp(
        dto:UserSigUpDto
    ) {
        const existingUSer = await this.repository.findByEmail(dto.email)
        if(existingUSer){
            throw new HttpException("User Sudah ada",HttpStatus.CONFLICT)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        return await this.repository.signUp(dto, hashedPassword)
    }
}
