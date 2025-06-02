import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSigUpDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly service:UserService
    ) {}

    @Post("signup")
    private async signUp(
        @Body() dto:UserSigUpDto
    ){
        return this.service.signUp(dto)
    }
}
