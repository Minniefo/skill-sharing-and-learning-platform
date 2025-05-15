import api from './api';
import { AxiosResponse } from 'axios';

// Define possible notification types
type NotificationType = 'LIKE' | 'COMMENT' | 'REPLY' | 'SELF_LIKE' | 'SELF_COMMENT' | 'SELF_REPLY' |'MENTION' |  null;

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationCount {
  unreadCount: number;
}

const notificationService = {
  getUserNotifications: (type: NotificationType = null): Promise<AxiosResponse<Notification[]>> => {
    const url = type ? `/notifications?type=${type}` : '/notifications';
    return api.get(url);
  },

  markAsRead: (notificationId: string): Promise<AxiosResponse> => {
    return api.post(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: (): Promise<AxiosResponse> => {
    return api.post('/notifications/read-all');
  },

  getUnreadCount: (): Promise<AxiosResponse<NotificationCount>> => {
    return api.get('/notifications/unread-count');
  },

  getUnreadNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    return api.get('/notifications/unread');
  },

  getLikeNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    return api.get('/notifications?type=LIKE');
  },

  getCommentNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    return api.get('/notifications?type=COMMENT,REPLY');
  },

  // Get self action notifications
  getSelfNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    return api.get('/notifications?type=SELF_LIKE,SELF_COMMENT,SELF_REPLY');
  },

  // For demo purposes - create a test notification
  createTestNotification: (type: NotificationType = 'COMMENT'): Promise<AxiosResponse<Notification>> => {
    return api.post('/notifications/test', { type });
  },

  // For demo purposes - create a self notification
  createSelfNotification: (type: NotificationType = 'SELF_COMMENT'): Promise<AxiosResponse<Notification>> => {
    return api.post('/notifications/test-self-notification', { type });
  }
};

export default notificationService;
