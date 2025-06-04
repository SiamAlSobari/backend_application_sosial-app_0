import { Body, Controller, Patch,  Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './profile.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly service:ProfileService
    ){}

    @Patch()
    private async updateProfile(
        @Body() dto:UpdateProfileDto,
        @Req() req:UserRequest
    ){
        return this.service.updateProfile(dto,req.user.id)
    }
}
