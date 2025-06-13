import { Injectable } from '@nestjs/common';
import { FollowerRepository } from './follower.repository';

@Injectable()
export class FollowerService {
    constructor(
        private readonly repository: FollowerRepository
    ) {}
}
