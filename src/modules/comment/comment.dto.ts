import { IsNotEmpty, IsString } from "class-validator";

export class CreateDefaultCommentDto {
    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}

export class CreateReplyCommentDto {
    @IsString()
    @IsNotEmpty()
    post_id: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    parent_id: string;
}


export class QueryCommentDto {
    @IsString()
    @IsNotEmpty()
    post_id: string;
}