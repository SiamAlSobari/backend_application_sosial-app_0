import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { CreateDefaultCommentDto, QueryCommentDto } from './comment.dto';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService:CommentService
    ){}

    @Post()
    @UseGuards(AuthGuard)
    public async createDefaultComment(
        @Body() dto: CreateDefaultCommentDto,
        @Req() req: UserRequest
    ){
        return await this.commentService.createDefaultComment(req.user.id, dto);
    }

    @Get()
    @UseGuards(AuthGuard)
    public async getCommentsByPostId(
        @Query() query:QueryCommentDto
    ) {
        return await this.commentService.getCommentsByPostId(query.post_id);
    }
}
