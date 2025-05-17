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

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const notificationService = {
  getUserNotifications: (type: NotificationType = null): Promise<AxiosResponse<Notification[]>> => {
    const user = getUserFromLocalStorage();
    const url = type ? `/notifications?type=${type}&userId=${user.uid}` : `/notifications?userId=${user.uid}`;
    return api.get(url);
  },

  markAsRead: (notificationId: string): Promise<AxiosResponse> => {
    return api.post(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: (): Promise<AxiosResponse> => {
    const user = getUserFromLocalStorage();
    return api.post(`/notifications/read-all?userId=${user.uid}`);
  },

  getUnreadCount: (): Promise<AxiosResponse<NotificationCount>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/notifications/unread-count?userId=${user?.uid}`);
  },

  getUnreadNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/notifications/unread?userId=${user?.uid}`);
  },

  getLikeNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/notifications?type=LIKE&userId=${user.uid}`);
  },

  getCommentNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/notifications?type=COMMENT,REPLY&userId=${user.uid}`);
  },

  // Get self action notifications
  getSelfNotifications: (): Promise<AxiosResponse<Notification[]>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/notifications?type=SELF_LIKE,SELF_COMMENT,SELF_REPLY&userId=${user.uid}`);
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
