import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CreateDefaultCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly repository:CommentRepository
    ) {}

    public async threeComment(comments: any[]) {
        const commentMap = new Map<string, any>(); // ini membuat key menjadi id komentar bisa di lihat itu string
        const rootComments: any[] = [];

        for (const comment of comments) {
            comment.replies = [];
            commentMap.set(comment.id, comment); //key adalah id komentar, value adalah objek komentar itu sendiri
        }
        // setelah loop di atas, commentMap akan berisi semua komentar dengan id sebagai key di bawah contohnya
//         {
//   "1": { id: "1", content: "Komentar A", parent_id: null, replies: [] },
//   "2": { id: "2", content: "Balasan ke A", parent_id: "1", replies: [] },
//   "3": { id: "3", content: "Komentar B", parent_id: null, replies: [] },
//   "4": { id: "4", content: "Balasan ke balasan A", parent_id: "2", replies: [] }
//         }
        for (const comment of comments){
            if(comment.parent_id){
                const parent = commentMap.get(comment.parent_id); // ini akan mendapatkan komentar induk berdasarkan parent_id
                if(parent){
                    parent.replies.push(comment);
                }
            }else{
                rootComments.push(comment);
            }
        }

        return rootComments;
    }


    public async createDefaultComment(user_id:string,dto:CreateDefaultCommentDto){
        const comment = await this.repository.createDefaultComment(user_id, dto);
        return {
            message: 'Comment created successfully',
            data: comment,
        }
    }

    public async getCommentsByPostId(post_id: string) {
        console.log('post_id', post_id);
        const comments = await this.repository.getCommentsByPostId(post_id);
        const buildComments = await this.threeComment(comments);
        return {
            message: 'Comments retrieved successfully',
            data: buildComments,
        }
    }

    public async getTotalCommentsByPostId(post_id: string) {
        const total = await this.repository.getTotalCommentsByPostId(post_id);
        return {
            message: 'Total comments retrieved successfully',
            data: total,
        }
    }
}
