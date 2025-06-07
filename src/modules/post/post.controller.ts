import { Body, Controller, Get, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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
        if(!files || files.length == 0) {
            dto.media = []
        }else{
            dto.media = files.map((file)=>{
                const media = new MediaDto()
                media.url = `${base_url}/upload/${file.filename}`
                media.type = file.mimetype
                return media
            })
        }
        return this.service.createPost(dto,req.user.id)
    }

    @Get()
    @UseGuards(AuthGuard)
    getPosts(@Req() req:UserRequest){
        return this.service.getPostsMe(req.user.id)
    }
}
