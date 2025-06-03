import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    user_name: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio:string;

    @IsOptional()
    @IsString()
    avatar_image:string
}