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

    public async signUp(dto: UserSigUpDto) {
        const existingUSer = await this.repository.findByEmail(dto.email)
        if (existingUSer) {
            throw new HttpException("User Sudah ada", HttpStatus.CONFLICT)
        }
        const existingUserName = await this.repository.findByUserName(dto.user_name)
        if (existingUserName) {
            throw new HttpException("Username Sudah ada", HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10)
        return this.repository.signUp(dto, hashedPassword)
    }

    public async signIn(dto: UserSigInDto) {
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

    public async deleteAccount(id:string){
        return this.repository.deleteAccount(id)
    }

    public async getAllUsers(user_id:string){
        const users = await this.repository.getAllUsers(user_id)
        return {
            message:"Data user ditemukan",
            data:users
        }
    }

    public async getUserRequest(user_id:string){
        const users = await this.repository.getUserRequest(user_id)
        return {
            message:"Data user ditemukan",
            data:users
        }
    }

    public async getUserFollowerById(id:string){
        const users = await this.repository.getUserFollowerById(id)
        return {
            message:"Data user ditemukan",
            data:users
        }
    }
}
