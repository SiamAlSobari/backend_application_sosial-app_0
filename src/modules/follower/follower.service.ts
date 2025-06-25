import { Injectable } from '@nestjs/common';
import { FollowerRepository } from './follower.repository';
import { QueryFollowerDto } from './follower.dto';

@Injectable()
export class FollowerService {
    constructor(
        private readonly repository: FollowerRepository
    ) {}

    public async findFollowers(user_id:string){
        const folllowers = await this.repository.findFollowers(user_id)
        const totalFollowers = await this.repository.totalFollowers(user_id)
        return {
            total_followers:totalFollowers,
            message:"Followers ditemukan",
            data:folllowers
        }
    }
}
