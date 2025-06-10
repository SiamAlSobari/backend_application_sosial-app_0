import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
    constructor(
        private readonly repository:ProfileRepository
    ){}

    public async updateProfile(
        dto:UpdateProfileDto,
        id:string
    ){
        return await this.repository.updateProfile(dto,id)
    }

    public async getProfileMe(user_id:string){
        const profile = await this.repository.getProfilMe(user_id)
        return {
            message:"Data profile ditemukan",
            data:profile
        }
    }
}
