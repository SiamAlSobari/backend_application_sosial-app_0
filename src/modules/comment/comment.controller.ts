import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { CreateDefaultCommentDto, CreateReplyCommentDto, QueryCommentDto } from './comment.dto';

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

    @Get('total/:post_id')
    public async getTotalCommentsByPostId(
        @Param('post_id') post_id: string
    ){
        return await this.commentService.getTotalCommentsByPostId(post_id);
    }

    @Post('reply')
    @UseGuards(AuthGuard)
    public async createCommentReply(
        @Body()dto:CreateReplyCommentDto,
        @Req() req: UserRequest
    ){
        return await this.commentService.createCommentReply(req.user.id, dto);
    }
}
