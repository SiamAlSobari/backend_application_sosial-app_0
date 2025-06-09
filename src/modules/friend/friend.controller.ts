import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { FriendService } from './friend.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { AddFriendDto, ResponeFriendDto } from './friend.dto';

@Controller('friend')
export class FriendController {
    constructor(
        private readonly service:FriendService
    ) {}

    @Post('request')
    @UseGuards(AuthGuard)
    public async addFriend(
        @Req() req:UserRequest,
        @Body() dto:AddFriendDto
    ){
        return this.service.sendRequest(req.user.id,dto)
    }

    @Patch('respone')
    @UseGuards(AuthGuard)
    public async responeRequest(
        @Req() req:UserRequest,
        @Body() dto:ResponeFriendDto
    ){
        return this.service.responeRequest(req.user.id,dto)
    }
}
