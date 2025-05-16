import React, { useState, useEffect } from 'react';
import LikeButton from '../likes/LikeButton';
import LikeCounter from '../likes/LikeCounter';
import CommentList from '../comments/CommentList';
import NotificationList from '../notifications/NotificationList';
import notificationService from '../../services/notificationService';
import { FaBell } from 'react-icons/fa';

interface Post {
  id?: string;
  postName?: string;
  postDescription?: string;
  postImage?: string;
  createdDate?: string;
  userName?: string;
  authorAvatar?: string;
}

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [refreshLikes, setRefreshLikes] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [refreshNotifications, setRefreshNotifications] = useState(0);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationService.getUnreadCount();
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notification count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [refreshNotifications]);

  const forceRefreshNotifications = () => {
    setRefreshNotifications((prev) => prev + 1);
    fetchUnreadCount();
  };

  const handleLikeToggle = () => {
    setRefreshLikes((prev) => prev + 1);
    forceRefreshNotifications();
  };

  const handleCommentAdded = () => {
    forceRefreshNotifications();
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      notificationService
        .markAllAsRead()
        .then(() => setUnreadCount(0))
        .catch((error) => console.error('Error marking notifications as read:', error));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 relative">
      <div className="flex justify-between items-center border-b border-gray-200 p-4">
        <div className="flex items-center">
          <img
            src="https://t4.ftcdn.net/jpg/08/23/95/89/360_F_823958944_1c9covIC7Tl7eyJtWoTiXc0L4vP6f43q.jpg"
            alt={post.userName}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-gray-800 text-base font-semibold">{post.userName}</h3>
            <span className="text-sm text-gray-400">{post.createdDate.toString().split("T")[0]}</span>
          </div>
        </div>
        <div
          className="relative cursor-pointer text-gray-400 hover:text-gray-700 p-2"
          onClick={toggleNotifications}
        >
          <FaBell size={18} />
          {unreadCount > 0 && (
            <span
              className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full
                         transform translate-x-1/2 -translate-y-1/2 animate-pulse"
            >
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl text-gray-900 font-semibold mb-4">{post.postName}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{post.postDescription}</p>
        {post.postImage && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img src={post.postImage} alt={post.postName} className="w-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 p-4">
        <div className="flex items-center">
          <LikeButton postId={post.id} onLikeToggle={handleLikeToggle} />
          <LikeCounter postId={post.id} refreshTrigger={refreshLikes} />
          <button
            className="ml-4 text-gray-500 text-xs rounded px-2 py-1 hover:bg-gray-100 hover:text-gray-700 transition"
            onClick={() => {
              notificationService.createSelfNotification().then(() => {
                forceRefreshNotifications();
              });
            }}
          >
            Test Notification
          </button>
        </div>
        <button
          className="text-gray-500 text-sm rounded px-3 py-2 hover:bg-gray-100 hover:text-gray-700 transition"
          onClick={toggleComments}
        >
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
      </div>

      {showComments && <CommentList postId={post.id} onCommentAdded={handleCommentAdded} />}

      {showNotifications && (
        <div className="absolute top-16 right-4 w-88 max-h-[400px] bg-white rounded-lg shadow-lg z-10 overflow-hidden">
          <div className="flex justify-between items-center bg-gray-50 border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900 m-0">Notifications</h3>
            <button
              onClick={toggleNotifications}
              className="text-gray-400 hover:text-gray-700 text-sm px-2 py-1 rounded transition"
            >
              Close
            </button>
          </div>
          <div className="max-h-[350px] overflow-y-auto p-0">
            <NotificationList compact autoRefresh refreshTrigger={refreshNotifications} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostItem;
