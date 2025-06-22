import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './post.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { MediaDto } from '../media/media.dto';
import { Request } from 'express';

@Controller('post')
export class PostController {
    constructor(
        private readonly service:PostService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    @UseInterceptors(
        FilesInterceptor('media',10,{
            storage:diskStorage({
                destination:"./upload",
                filename:(req,file,cb) => {
                    const uniqueName = `${randomUUID()}${extname(file.originalname)}`
                    cb(null,uniqueName)
                }
            })
        })
    )
    
    createPost(
        @Body() dto:CreatePostDto,
        @Req() req:UserRequest,
        @UploadedFiles() files:Express.Multer.File[]
    ){
        const base_url = `${(req as unknown as Request).protocol}://${(req as unknown as Request).headers.host}`
        return this.service.createPost(dto,req.user.id,files,base_url)
    }

    @Get()
    @UseGuards(AuthGuard)
    getPosts(@Req() req:UserRequest){
        return this.service.getPostsMe(req.user.id)
    }

    @Get('all')
    getAllPosts(){
        return this.service.getAllPostsByDesc()
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getPostById(
        @Param('id') id:string,
    ){
        return this.service.getPostById(id)
    }

    @Get('user/:id')
    @UseGuards(AuthGuard)
    getUserIdPosts(
        @Param('id') id:string
    ){
        return this.service.getUserIdPosts(id)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deletePost(
        @Req() req:UserRequest,
        @Param('id') id:string
    ){
        return this.service.deletePost(req.user.id,id)
    }
}
