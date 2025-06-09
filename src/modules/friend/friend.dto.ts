import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { FriendRequestStatus } from "src/common/enum/friend-request-status.enum";

export class AddFriendDto {
    @IsString()
    @IsNotEmpty()
    receiver_id:string;
}

export class ResponeFriendDto {
    @IsEnum(FriendRequestStatus)
    @IsNotEmpty()
    status:FriendRequestStatus

    @IsString()
    @IsNotEmpty()
    receiver_id:string
}