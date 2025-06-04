import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';

@Module({
  providers: [MediaService, MediaRepository],
  controllers: []
})
export class MediaModule {}
