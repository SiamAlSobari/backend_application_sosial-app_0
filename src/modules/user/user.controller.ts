import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSigInDto, UserSigUpDto } from './user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';

@Controller('user')
export class UserController {
    constructor(
        private readonly service:UserService
    ) {}

    @Post("register")
    public async signUp(
        @Body() dto:UserSigUpDto
    ){
        return this.service.signUp(dto)
    }

    @Post("login")
    public async signIn(
        @Body() dto:UserSigInDto,
        @Res({passthrough:true}) res:Response
    ){
        const {message,acces_token} = await this.service.signIn(dto)
        res.cookie("token",acces_token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:1000 * 60 * 60 * 24
        })
        return {message,acces_token}
    }

    
    @Delete()
    @UseGuards(AuthGuard)
    public async deleteAccount(
        @Req() req:UserRequest,
        @Param("id") id:string
    ){
        return this.service.deleteAccount(id)
    }


    @Get()
    @UseGuards(AuthGuard)
    public async me(
        @Req() req:UserRequest
    ){
        return {loggedIn:true,user:req.user}
    }

    @Get("all")
    @UseGuards(AuthGuard)
    public async getAllUsers(
        @Req() req:UserRequest
    ){
        return this.service.getAllUsers(req.user.id)
    }

    @Get("request")
    @UseGuards(AuthGuard)
    public async getFollowRequest(
        @Req() req:UserRequest
    ){
        return this.service.getUserRequest(req.user.id)
    }

    @Get("follower/:id")
    @UseGuards(AuthGuard)
    public async getFollowerById(
        @Param("id") id:string
    ){
        return this.service.getUserFollowerById(id)
    }
}
