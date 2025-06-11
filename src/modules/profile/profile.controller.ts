import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './profile.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { Request } from 'express';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  //update banner
  @Patch('banner')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './upload',
        filename(req, file, callback) {
          const filename = `${randomUUID()}${extname(file.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  public async updateCoverProfile(
    @Req() req: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const base_url = `${(req as unknown as Request).protocol}://${(req as unknown as Request).headers.host}`;
    return this.service.updateCoverProfile(req.user.id, file, base_url);
  }

  @Get()
  @UseGuards(AuthGuard)
  public async getProfileMe(@Req() req: UserRequest) {
    return this.service.getProfileMe(req.user.id);
  }

  @Patch('avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar',{
        storage: diskStorage({
            destination: './upload',
            filename(req, file, callback) {
                const filename = `${randomUUID()}${extname(file.originalname)}`;
                callback(null, filename);
            },
        })
    })
  )
  public async updateProfileAvatar(
    @Req() req: UserRequest,
    @UploadedFile() file: Express.Multer.File
  ){
    const base_url = `${(req as unknown as Request).protocol}://${(req as unknown as Request).headers.host}`;
    return this.service.updateProfileAvatar(req.user.id,file,base_url)
  }
}
