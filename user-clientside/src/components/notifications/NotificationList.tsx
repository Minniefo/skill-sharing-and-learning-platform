import React, { useState, useEffect } from 'react';
import NotificationItem from './NotificationItem';
import notificationService from '../../services/notificationService';

type NotificationType = 'likes' | 'comments' | 'mentions' | 'all';

const NotificationList = ({
  autoRefresh = true,
  compact = false,
  refreshTrigger = 0,
  showAllTypes = true
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<NotificationType>('all');

  useEffect(() => {
    fetchNotifications();

    let interval: NodeJS.Timeout | undefined;
    if (autoRefresh) {
      interval = setInterval(fetchNotifications, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, refreshTrigger, activeFilter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      let response;

      switch (activeFilter) {
        case 'likes':
          response = await notificationService.getUserNotifications('LIKE');
          break;
        case 'comments':
          response = await notificationService.getUserNotifications('COMMENT');
          break;
        case 'mentions':
          response = await notificationService.getUserNotifications('MENTION');
          break;
        case 'all':
        default:
          response = await notificationService.getUserNotifications();
          break;
      }

      setNotifications(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to load notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleNotificationRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div
      className={`
        bg-white rounded-md shadow-sm overflow-hidden mb-6
        ${compact ? 'shadow-none mb-0' : ''}
      `}
    >
      {!compact && (
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold m-0 flex items-center">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>

          <div className="flex items-center">
            {unreadCount > 0 && (
              <button
                className="bg-transparent border-none text-blue-600 text-sm cursor-pointer ml-2 hover:underline"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
            <button
              className="bg-transparent border-none text-blue-600 text-sm cursor-pointer ml-2 hover:underline"
              onClick={fetchNotifications}
            >
              Refresh
            </button>
          </div>
        </div>
      )}

      {!compact && (
        <div className="flex overflow-x-auto border-b border-gray-200 px-4 py-2">
          {['all', 'comments', 'likes', 'mentions'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as NotificationType)}
              className={`
                whitespace-nowrap rounded-full text-sm px-3 py-1 mr-2
                cursor-pointer
                ${activeFilter === filter
                  ? 'bg-gray-300 text-gray-900 font-medium'
                  : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
              `}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-gray-500">Loading notifications...</div>
      ) : error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          You have no notifications. When someone likes or comments on your post, you'll see it here.
        </div>
      ) : (
        <div
          className={`
            overflow-y-auto
            ${compact ? 'max-h-72' : 'max-h-[400px]'}
          `}
        >
          {notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={handleNotificationRead}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationList;
