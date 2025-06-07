import { IsEnum, IsUrl } from "class-validator"

export class MediaDto {
    @IsUrl()
    url: string

    type: string
}