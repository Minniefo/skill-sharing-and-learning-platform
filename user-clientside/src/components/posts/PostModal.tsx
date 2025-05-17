import React, { useState } from 'react';
import type { Post } from '../../types/index';

interface PostModalProps {
  post: Post;
  onClose: () => void;
}

type SlideType = 'image' | 'image1' | 'image2' | 'video';

export const PostModal: React.FC<PostModalProps> = ({ post, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState<SlideType>('image');

  const renderMedia = () => {
    if (currentSlide === 'video' && post.postVideo) {
      return (
        <video
          controls
          className="w-full h-full object-contain"
          src={post.postVideo}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (currentSlide === 'image1' && post.postImage1) {
      return (
        <img
          src={post.postImage1}
          alt={`${post.postName} - photo 1`}
          className="w-full h-full object-contain"
        />
      );
    }

    if (currentSlide === 'image2' && post.postImage2) {
      return (
        <img
          src={post.postImage2}
          alt={`${post.postName} - photo 2`}
          className="w-full h-full object-contain"
        />
      );
    }

    // Fallback to main image
    return (
      <img
        src={post.postImage}
        alt={post.postName}
        className="w-full h-full object-contain"
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-2">{post.postName}</h2>
        <p className="text-gray-700 mb-4">{post.postDescription}</p>

        <div className="relative w-full h-64 overflow-hidden rounded mb-4">
          {renderMedia()}
        </div>

        <div className="flex justify-center flex-wrap gap-2">
          {post.postImage && (
            <SlideButton
              label="Main Photo"
              active={currentSlide === 'image'}
              onClick={() => setCurrentSlide('image')}
            />
          )}
          {post.postImage1 && (
            <SlideButton
              label="Photo 1"
              active={currentSlide === 'image1'}
              onClick={() => setCurrentSlide('image1')}
            />
          )}
          {post.postImage2 && (
            <SlideButton
              label="Photo 2"
              active={currentSlide === 'image2'}
              onClick={() => setCurrentSlide('image2')}
            />
          )}
          {post.postVideo && (
            <SlideButton
              label="Video"
              active={currentSlide === 'video'}
              onClick={() => setCurrentSlide('video')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

interface SlideButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const SlideButton: React.FC<SlideButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm rounded transition
      ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
  >
    {label}
  </button>
);
