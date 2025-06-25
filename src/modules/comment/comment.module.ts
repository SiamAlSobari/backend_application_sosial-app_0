import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { JwtService } from '@nestjs/jwt';
import { NotificationRepository } from '../notification/notification.repository';
import { PostRepository } from '../post/post.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository,JwtService,NotificationRepository,PostRepository,UserRepository],
})
export class CommentModule {}
