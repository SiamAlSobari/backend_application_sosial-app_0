import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {

    @IsOptional()
    @IsString()
    bio: string

    @IsOptional()
    @IsString()
    alamat: string

    @IsOptional()
    @IsString()
    pekerjaan: string

    @IsOptional()
    @IsString()
    pendidikan: string

    @IsOptional()
    @IsString()
    gender: string

    @IsOptional()
    @IsString()
    tanggal_lahir: string

    @IsOptional()
    @IsString()
    website: string
}