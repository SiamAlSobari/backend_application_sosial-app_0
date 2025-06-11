import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './profile.dto';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
    constructor(
        private readonly repository:ProfileRepository
    ){}

    public async updateCoverProfile(
        id:string,
        file:Express.Multer.File,
        base_url:string
    ){
        return await this.repository.updateCoverProfile(id,file,base_url)
    }

    public async getProfileMe(user_id:string){
        const profile = await this.repository.getProfilMe(user_id)
        return {
            message:"Data profile ditemukan",
            data:profile
        }
    }

    public async updateProfileAvatar(user_id:string,file:Express.Multer.File,base_url:string){
        return await this.repository.updateProfileAvatar(user_id,file,base_url)
    }
}
