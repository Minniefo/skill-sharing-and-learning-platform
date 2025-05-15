import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import likeService from '../../services/likeService';
import './LikeButton.css';

interface LikeButtonProps {
  postId: string;
  onLikeToggle?: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, onLikeToggle }) => {
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const response = await likeService.checkIfUserLikedPost(postId); 
        const userLiked = response.data.data; // Assumes backend returns { success: true, data: true/false }
        setLiked(userLiked);
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
      setLiked(!liked);
      if (onLikeToggle) {
        onLikeToggle();
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`like-button ${liked ? 'liked' : ''}`} 
      onClick={handleToggleLike}
      disabled={isLoading}
    >
      {liked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
