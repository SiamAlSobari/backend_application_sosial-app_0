import { IsNotEmpty, IsString } from "class-validator";

export class FollowRequestDto {
    @IsNotEmpty()
    @IsString()
    receiver_id
}