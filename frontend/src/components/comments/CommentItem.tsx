import React, { useState } from 'react';
import moment from 'moment';
import { FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';
import './CommentItem.css';

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  postId: string;
  onCommentUpdated: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, postId, onCommentUpdated }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUserId = "user123"; // Replace with: localStorage.getItem('userId');
  const isCommentOwner = true; // Replace with: currentUserId === comment.userId

  const handleReply = () => {
    setShowReplyForm(!showReplyForm);
    setShowEditForm(false);
  };

  const handleEdit = () => {
    setShowEditForm(!showEditForm);
    setShowReplyForm(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setIsDeleting(true);
      try {
        await commentService.deleteComment(comment.id);
        onCommentUpdated();
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCommentAdded = () => {
    setShowReplyForm(false);
    onCommentUpdated();
  };

  const handleCommentUpdated = () => {
    setShowEditForm(false);
    onCommentUpdated();
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Unknown date';
    try {
      return moment(dateString).fromNow();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-user-info">
          <span className="comment-username">{comment.username || 'Anonymous'}</span>
          <span className="comment-time">{formatDate(comment.createdAt)}</span>
        </div>
        <div className="comment-actions">
          <button className="action-button" onClick={handleReply}>
            <FaReply /> Reply
          </button>
          {isCommentOwner && (
            <>
              <button className="action-button" onClick={handleEdit}>
                <FaEdit /> Edit
              </button>
              <button 
                className="action-button delete" 
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <FaTrash /> {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </>
          )}
        </div>
      </div>

      {!showEditForm ? (
        <div className="comment-content">{comment.content}</div>
      ) : (
        <CommentForm 
          postId={postId}
          commentId={comment.id}
          initialValue={comment.content}
          onCommentAdded={handleCommentUpdated}
          isEdit={true}
        />
      )}

      {showReplyForm && (
        <div className="reply-form-container">
          <p className="reply-notification">Your reply will notify {comment.username}</p>
          <CommentForm 
            postId={postId}
            parentId={comment.id}
            onCommentAdded={handleCommentAdded}
            isReply={true}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          <div className="replies-header">Replies ({comment.replies.length})</div>
          {comment.replies.map(reply => (
            <CommentItem 
              key={reply.id}
              comment={reply}
              postId={postId}
              onCommentUpdated={onCommentUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
