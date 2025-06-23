import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository,JwtService],
})
export class CommentModule {}
