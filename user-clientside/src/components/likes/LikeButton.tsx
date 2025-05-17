import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import likeService from '../../services/likeService';

interface LikeButtonProps {
  postId: string;
  onLikeToggle?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, onLikeToggle }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await likeService.checkIfUserLikedPost(postId);
        setLiked(response.data.data);
      } catch (error) {
        console.error('Error checking if post is liked:', error);
      }
    };

    checkIfLiked();
  }, [postId]);

  const handleToggleLike = async () => {
    setIsLoading(true);
    try {
      await likeService.toggleLike(postId);
      setLiked(prev => !prev);
      setAnimate(true); // trigger animation
      if (onLikeToggle) onLikeToggle();
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
      setTimeout(() => setAnimate(false), 300); // reset animation state
    }
  };

  return (
    <>
      <button
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`text-2xl p-2 transition-all duration-200 
          ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'} 
          ${animate ? 'heart-beat' : ''}`}
      >
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      {/* Inline style block for custom animation */}
      <style>
        {`
          .heart-beat {
            animation: heart-beat 0.3s ease;
          }

          @keyframes heart-beat {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default LikeButton;
