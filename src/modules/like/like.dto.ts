import { IsNotEmpty, IsString } from "class-validator";

export class LikeDto{
    @IsNotEmpty()
    @IsString()
    post_id:string
}