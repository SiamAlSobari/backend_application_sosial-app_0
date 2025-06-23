import { IsNotEmpty, IsString } from "class-validator";

export class CreateDefaultCommentDto {
    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}