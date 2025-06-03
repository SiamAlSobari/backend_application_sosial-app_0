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
        return this.repository.updateProfile(dto,id)
    }
}
