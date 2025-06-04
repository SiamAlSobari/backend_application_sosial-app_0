import { IsEnum, IsUrl } from "class-validator"
import { MediaEnum } from "src/common/enum/media.enum"

export class MediaDto {
    @IsUrl()
    url: string

    @IsEnum(MediaEnum)
    type: MediaEnum
}