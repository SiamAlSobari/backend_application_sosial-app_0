import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { LikeDto } from './like.dto';

@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ) {}

    @Post()
    @UseGuards(AuthGuard)
    public async createLikePost(
        @Req() req:UserRequest,
        @Body() dto:LikeDto
    ){
        return this.likeService.createLikePost(req.user.id,dto)
    }

    @Delete()
    @UseGuards(AuthGuard)
    public async deleteLikePost(
        @Req() req:UserRequest,
        @Body() dto:LikeDto
    ){
        return this.likeService.deleteLikePost(req.user.id,dto)
    }
}
