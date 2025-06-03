import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),UserModule,PrismaModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
