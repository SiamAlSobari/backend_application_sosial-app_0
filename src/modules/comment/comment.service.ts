import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateDefaultCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly repository:CommentRepository
    ) {}

    public async createDefaultComment(user_id:string,dto:CreateDefaultCommentDto){
        const comment = await this.repository.createDefaultComment(user_id, dto);
        return {
            message: 'Comment created successfully',
            data: comment,
        }
    }
}
