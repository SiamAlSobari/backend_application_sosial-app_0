import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { MediaService } from '../media/media.service';
import { MediaRepository } from '../media/media.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PostService,PostRepository,MediaService,MediaRepository,JwtService],
  controllers: [PostController]
})
export class PostModule {}
