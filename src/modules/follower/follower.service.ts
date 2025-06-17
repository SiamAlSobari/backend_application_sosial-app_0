import { Injectable } from '@nestjs/common';
import { FollowerRepository } from './follower.repository';

@Injectable()
export class FollowerService {
    constructor(
        private readonly repository: FollowerRepository
    ) {}

    public async findFollowers(user_id:string){
        const folllowers = await this.repository.findFollowers(user_id)
        return {
            message:"Followers ditemukan",
            data:folllowers
        }
    }
}
