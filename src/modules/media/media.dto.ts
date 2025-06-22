import { IsEnum, IsOptional, IsString, IsUrl } from "class-validator"

export class MediaDto {
    @IsOptional()
    @IsString()
    id?: string

    @IsUrl()
    url: string

    type: string
}