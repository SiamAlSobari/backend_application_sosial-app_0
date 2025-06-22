import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { MediaDto } from '../media/media.dto';
import { Transform, Type } from 'class-transformer';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media?: MediaDto[];
}
export class UpdatePostDto {
  @IsOptional()
  @IsString()
  caption: string;

  @IsOptional()
  @IsString()
  post_id: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MediaDto)
  media?: MediaDto[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    // Kalau dikirim dari form-data sebagai string JSON
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
  @IsString({ each: true })
  deletedMediaIds?: string[];
}
