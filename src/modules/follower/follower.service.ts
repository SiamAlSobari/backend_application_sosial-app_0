import { Injectable } from '@nestjs/common';
import { FollowerRepository } from './follower.repository';
import { QueryFollowerDto } from './follower.dto';

@Injectable()
export class FollowerService {
    constructor(
        private readonly repository: FollowerRepository
    ) {}

    public async findFollowers(user_id:string,query:QueryFollowerDto){
        const folllowers = await this.repository.findFollowers(user_id,query)
        const totalFollowers = await this.repository.totalFollowers(user_id)
        return {
            tota_followers:totalFollowers,
            total_data:folllowers.length,
            page:Number(query.page),
            message:"Followers ditemukan",
            data:folllowers
        }
    }
}
