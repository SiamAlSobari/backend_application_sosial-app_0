import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserSigInDto, UserSigUpDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService  {
    constructor(
        private readonly repository: UserRepository,
        private readonly jwtService:JwtService
    ) {}

    async signUp(dto: UserSigUpDto) {
        const existingUSer = await this.repository.findByEmail(dto.email)
        if (existingUSer) {
            throw new HttpException("User Sudah ada", HttpStatus.CONFLICT)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        return this.repository.signUp(dto, hashedPassword)
    }

    async signIn(dto: UserSigInDto) {
        const existingUser = await this.repository.findByEmail(dto.email)
        if(!existingUser){
            throw new HttpException("User tidak ada ",HttpStatus.NOT_FOUND)
        }
        const doesPassword = await bcrypt.compare(dto.password,existingUser.password)
        if(!doesPassword){
            throw new HttpException("Password Salah",HttpStatus.BAD_REQUEST)
        }
        const payload = {
            id:existingUser.id,
            email:existingUser.email
        };
        return {
            message:"Login Berhasil",
            acces_token : await this.jwtService.signAsync(payload)
        }
    }
}
