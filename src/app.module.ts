import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { MediaModule } from './modules/media/media.module';
import { FollowerModule } from './modules/follower/follower.module';
import { FollowRequestModule } from './modules/follow-request/follow-request.module';
import { LikeModule } from './modules/like/like.module';
import { LikesController } from './modules/likes/likes.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UserModule,PrismaModule, ProfileModule, PostModule, MediaModule, FollowerModule, FollowRequestModule, LikeModule],
  controllers: [AppController, LikesController],
  providers: [AppService],
})
export class AppModule {}
