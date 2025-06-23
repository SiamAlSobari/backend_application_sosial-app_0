import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    constructor(
        private readonly repository:CommentRepository
    ) {}
}
