import { Body, Controller, Get, Patch,  Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './profile.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(
        private readonly service:ProfileService
    ){}

    @Patch()
    @UseGuards(AuthGuard)
    public async updateProfile(
        @Body() dto:UpdateProfileDto,
        @Req() req:UserRequest
    ){
        return this.service.updateProfile(dto,req.user.id)
    }

    @Get()
    @UseGuards(AuthGuard)
    public async getProfileMe(
        @Req() req:UserRequest
    ){
        return this.service.getProfileMe(req.user.id)
    }
}
