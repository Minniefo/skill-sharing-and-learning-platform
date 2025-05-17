import React, { useState } from 'react';
import moment from 'moment';
import { FaReply, FaEdit, FaTrash } from 'react-icons/fa';
import CommentForm from './CommentForm';
import commentService from '../../services/commentService';

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
  const isCommentOwner = currentUserId === comment.userId;

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
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800">{comment.username || 'Anonymous'}</span>
          <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            onClick={handleReply}
          >
            <FaReply /> Reply
          </button>
          {isCommentOwner && (
            <>
              <button
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                onClick={handleEdit}
              >
                <FaEdit /> Edit
              </button>
              <button
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
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
        <div className="mb-3 text-gray-700 break-words leading-relaxed">
          {comment.content}
        </div>
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
        <div className="mt-4 mb-4 pl-4 border-l-2 border-gray-200">
          <p className="text-sm text-gray-500 italic mb-2">
            Your reply will notify {comment.username}
          </p>
          <CommentForm
            postId={postId}
            parentId={comment.id}
            onCommentAdded={handleCommentAdded}
            isReply={true}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-6 border-l-2 border-gray-200">
          <div className="text-sm font-semibold text-gray-700 mb-3 pb-2 border-b border-dashed border-gray-200">
            Replies ({comment.replies.length})
          </div>
          {comment.replies.map((reply) => (
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
