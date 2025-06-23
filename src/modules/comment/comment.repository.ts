import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDefaultCommentDto } from "./comment.dto";

@Injectable()
export class CommentRepository {
    constructor(
        private readonly prisma:PrismaService
    ) {}

    public async createDefaultComment(user_id: string, dto: CreateDefaultCommentDto) {
        return await this.prisma.comment.create({
            data: {
                content: dto.content,
                user_id: user_id,
                post_id: dto.post_id,
                parent_id: null, // top-level comment
            },
        });
    }
}