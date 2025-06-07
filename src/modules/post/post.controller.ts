import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('post')
export class PostController {
    constructor(
        private readonly service:PostService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    createPost(
        @Body() dto:CreatePostDto,
        @Req() req:UserRequest
    ){
        return this.service.createPost(dto,req.user.id)
    }
}
