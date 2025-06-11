import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

    @IsOptional()
    @IsString()
    cover_image:string
}