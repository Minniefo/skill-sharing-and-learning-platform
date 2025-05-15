import React, { useState, useEffect } from 'react';
import likeService from '../../services/likeService';
import './LikeCounter.css';

interface LikeCounterProps {
  postId: string;
  refreshTrigger?: any;
}

const LikeCounter: React.FC<LikeCounterProps> = ({ postId, refreshTrigger }) => {
  const [likeCount, setLikeCount] = useState<number>(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await likeService.getLikesByPostId(postId);
        console.log('Like API response:', response.data);

        const data = response.data;

        if (Array.isArray(data)) {
          setLikeCount(data.length);
        } else if (data && typeof data === 'object' && 'count' in data) {
          const countValue = (data as { count: unknown }).count;
          if (typeof countValue === 'number') {
            setLikeCount(countValue);
          } else {
            console.warn('`count` is not a number:', countValue);
            setLikeCount(0);
          }
        } else {
          console.warn('Unexpected like response format:', data);
          setLikeCount(0);
        }
      } catch (error) {
        console.error('Error fetching like count:', error);
        setLikeCount(0);
      }
    };

    fetchLikes();
  }, [postId, refreshTrigger]);

  return (
    <div className="like-counter">
      {likeCount} {likeCount === 1 ? 'like' : 'likes'}
    </div>
  );
};

export default LikeCounter;
