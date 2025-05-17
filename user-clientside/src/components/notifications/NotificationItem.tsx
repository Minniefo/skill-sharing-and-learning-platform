import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHeart,
  FaComment,
  FaUser,
  FaAt,
  FaReply
} from 'react-icons/fa';
import moment from 'moment';

type NotificationType = 'LIKE' | 'COMMENT' | 'REPLY' | 'SELF_LIKE' | 'SELF_COMMENT' | 'SELF_REPLY' | 'FOLLOW' | 'MENTION' | null;

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt: string;
  link: string;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead }) => {
  const getNotificationIcon = () => {
    const baseClass = "text-xl";

    switch (notification.type) {
      case 'LIKE':
      case 'SELF_LIKE':
        return (
          <FaHeart
            className={`${baseClass} ${notification.type.includes('SELF') ? 'text-purple-800' : 'text-red-500'}`}
          />
        );
      case 'COMMENT':
      case 'SELF_COMMENT':
        return (
          <FaComment
            className={`${baseClass} ${notification.type.includes('SELF') ? 'text-purple-800' : 'text-blue-500'}`}
          />
        );
      case 'REPLY':
      case 'SELF_REPLY':
        return (
          <FaReply
            className={`${baseClass} ${notification.type.includes('SELF') ? 'text-purple-800' : 'text-purple-600'}`}
          />
        );
      case 'FOLLOW':
        return <FaUser className={`${baseClass} text-green-500`} />;
      case 'MENTION':
        return <FaAt className={`${baseClass} text-purple-500`} />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Link
      to={notification.link}
      onClick={handleClick}
      className={`
        relative flex items-center p-4 border-b border-gray-200 no-underline text-inherit
        transition-colors duration-200
        ${!notification.read ? 'bg-blue-50' : ''}
        ${!notification.read && notification.type?.includes('SELF') ? 'bg-purple-100' : ''}
        hover:bg-gray-50
      `}
    >
      <div className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
        {getNotificationIcon()}
      </div>

      <div className="flex-1">
        <div className="font-medium text-gray-800 mb-1">
          {notification.message}
        </div>
        <div className="text-xs text-gray-500">
          {moment(notification.createdAt).fromNow()}
        </div>
      </div>

      {!notification.read && (
        <div className="absolute top-5 right-4 w-2 h-2 rounded-full bg-blue-500"></div>
      )}
    </Link>
  );
};

export default NotificationItem;
