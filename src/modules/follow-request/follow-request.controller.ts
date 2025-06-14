import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FollowRequestService } from './follow-request.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FollowRequestDto } from './follow-request.dto';
import { UserRequest } from 'src/common/interfaces/request.interface';

@Controller('follow-request')
export class FollowRequestController {
    constructor(
        private readonly service: FollowRequestService
    ) {}

    @Post('send')
    @UseGuards(AuthGuard)
    sendFollowRequest(
        @Body() dto: FollowRequestDto,
        @Req() req: UserRequest
    ) {
        return this.service.sendFollowRequest(dto, req.user.id)
    }

    @Post('accept')
    @UseGuards(AuthGuard)
    acceptFollowRequest(
        @Body() dto: FollowRequestDto,
        @Req() req: UserRequest
    ) {
        return this.service.acceptFollowRequest(dto, req.user.id)
    }
}
