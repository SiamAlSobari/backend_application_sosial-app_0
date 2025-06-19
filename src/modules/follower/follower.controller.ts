import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UserRequest } from 'src/common/interfaces/request.interface';
import { QueryFollowerDto } from './follower.dto';

@Controller('follower')
export class FollowerController {
    constructor(
        private readonly service:FollowerService
    ){}

    @Get("followers")
    @UseGuards(AuthGuard)
    public async getFollowers(
        @Req() req:UserRequest,
        @Query() query:QueryFollowerDto
    ){
        return this.service.findFollowers(req.user.id,query)
    }
}
