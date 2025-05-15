import React, { useState, useEffect } from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';
import './CommentList.css';

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

interface CommentListProps {
  postId: string;
  onCommentAdded?: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ postId, onCommentAdded }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await commentService.getCommentsByPostId(postId);
        console.log('Comments received:', response.data);

        const rawComments: Comment[] = response.data;

        const rootComments = rawComments.filter(comment => !comment.parentId);
        const commentMap: Record<string, Comment> = rawComments.reduce((map, comment) => {
          map[comment.id] = { ...comment, replies: [] };
          return map;
        }, {} as Record<string, Comment>);

        rawComments.forEach(comment => {
          if (comment.parentId && commentMap[comment.parentId]) {
            commentMap[comment.parentId].replies!.push(commentMap[comment.id]);
          }
        });

        const organizedComments = rootComments.map(comment => commentMap[comment.id]);
        console.log('Organized comments:', organizedComments);
        setComments(organizedComments);
        setError(null);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('Failed to load comments. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, refreshKey]);

  const refreshComments = () => {
    setRefreshKey(prevKey => prevKey + 1);
    if (onCommentAdded) {
      onCommentAdded();
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <CommentForm postId={postId} onCommentAdded={refreshComments} />

      {loading ? (
        <div>Loading comments...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem 
                key={comment.id}
                comment={comment}
                postId={postId}
                onCommentUpdated={refreshComments}
              />
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList;
