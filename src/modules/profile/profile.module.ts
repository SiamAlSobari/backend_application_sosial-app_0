import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ProfileService,JwtService, ProfileRepository],
  controllers: [ProfileController]
})
export class ProfileModule {}
