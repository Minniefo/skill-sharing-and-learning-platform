import React, { useState } from 'react';
import type { Post } from '../../types/index';

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [isViewingImage, setIsViewingImage] = useState(true); // State to toggle between image and video

  const handleToggle = () => {
    setIsViewingImage(!isViewingImage); // Toggle between image and video
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">{post.postName}</h2>
        <p className="text-gray-700 mb-4">{post.postDescription}</p>
        <div className="relative w-full h-64 overflow-hidden rounded mb-4">
          {isViewingImage && post.postImage && (
            <img
              src={post.postImage}
              alt={post.postName}
              className="w-full h-full object-contain" // Changed to object-contain
            />
          )}
          {!isViewingImage && post.postVideo && (
            <video
              controls
              className="w-full h-full object-contain" // Changed to object-contain
              src={post.postVideo}
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {post.postImage && post.postVideo && (
            <button
              onClick={handleToggle}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isViewingImage ? 'View Video' : 'View Image'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};