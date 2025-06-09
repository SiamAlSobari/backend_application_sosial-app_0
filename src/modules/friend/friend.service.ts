import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FriendRepository } from './friend.repository';
import { AddFriendDto } from './friend.dto';

@Injectable()
export class FriendService {
    constructor(
        private readonly repository: FriendRepository
    ) {}

    public async addFriend(sender_id:string,dto:AddFriendDto) {
        if(sender_id === dto.receiver_id){
            throw new HttpException("Tidak bisa menambahkan diri sendiri",HttpStatus.BAD_REQUEST)
        }
        const existingFrind = await this.repository.getFriendExist(sender_id,dto.receiver_id)
        if(existingFrind){
            throw new HttpException("Friend sudah ada",HttpStatus.CONFLICT)
        }
        return await this.repository.addFriend(sender_id,dto.receiver_id)
    }
}
