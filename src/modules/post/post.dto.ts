import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { MediaDto } from "../media/media.dto";
import { Type } from "class-transformer";

export class CreatePostDto {
    @IsOptional()
    @IsString()
    caption: string

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => MediaDto)
    media?:MediaDto[]
}