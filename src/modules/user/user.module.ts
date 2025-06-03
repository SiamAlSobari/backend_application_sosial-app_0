import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService,UserRepository],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory:  (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions:{expiresIn:'1d'},
        global: true
      })
    })
  ],
})
export class UserModule {}
