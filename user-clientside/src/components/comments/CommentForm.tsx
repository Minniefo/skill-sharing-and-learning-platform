import React, { useState, FormEvent } from 'react';
import commentService from '../../services/commentService';

interface CommentFormProps {
  postId: string;
  parentId?: string | null;
  commentId?: string | null;
  initialValue?: string;
  onCommentAdded?: () => void;
  isReply?: boolean;
  isEdit?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId = null,
  commentId = null,
  initialValue = '',
  onCommentAdded,
  isReply = false,
  isEdit = false,
}) => {
  const [content, setContent] = useState<string>(initialValue);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (isEdit && commentId) {
        await commentService.updateComment(commentId, content);
      } else {
        await commentService.addComment(postId, content, parentId);
      }

      setContent('');
      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholder = () => {
    if (isReply) return 'Write a reply... (use @username to mention someone)';
    if (isEdit) return 'Edit your comment...';
    return 'Write a comment... (use @username to mention someone)';
  };

  return (
    <form
      className={`mb-4 ${isReply ? '' : ''}`}
      onSubmit={handleSubmit}
    >
      {error && (
        <div className="text-red-500 bg-red-100 px-4 py-2 rounded-md mb-3 text-sm">
          {error}
        </div>
      )}
      <textarea
        className="w-full p-3 border border-gray-300 rounded-md text-sm resize-vertical min-h-[80px] mb-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={getPlaceholder()}
        rows={isReply ? 2 : 3}
        required
      />
      <div className="flex justify-end gap-3">
        {!isEdit && (
          <button
            type="button"
            className="px-4 py-2 rounded-md text-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
            onClick={() => {
              setContent('');
              setError(null);
              if (onCommentAdded) onCommentAdded();
            }}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-sm text-white ${
            isSubmitting || !content.trim()
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={isSubmitting || !content.trim()}
        >
          {isSubmitting
            ? 'Submitting...'
            : isEdit
            ? 'Update'
            : isReply
            ? 'Reply'
            : 'Comment'}
        </button>
      </div>
      {content.includes('@') && (
        <div className="mt-2 text-xs text-gray-500 italic">
          You can mention users with @username. They will be notified.
        </div>
      )}
    </form>
  );
};

export default CommentForm;