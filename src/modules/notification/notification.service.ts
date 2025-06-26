import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
    constructor(
        private readonly notificationRepository: NotificationRepository
    ) {}

    public async getNotification(user_id: string) {
        return this.notificationRepository.getNotification(user_id);
    }

    public async updateNotification(user_id: string) {
        return this.notificationRepository.updateNotification(user_id);
    }
}
