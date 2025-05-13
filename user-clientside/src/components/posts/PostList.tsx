import React, { useState } from 'react';
import type { Post } from '../../types/index';
import { Button } from '../ui/Button';
import { deletePost } from '../../services/api';

interface PostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  onEditPost,
  onDeletePost
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        setDeletingId(id);
        await deletePost(id);
        onDeletePost(id);
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No posts found. Create your first post above!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {post.postImage && (
            <img
              src={post.postImage}
              alt={post.postName}
              className="w-full h-110 object-cover"
            />
          )}
          {post.postVideo && (
            <video
              controls
              className="w-full h-110 object-cover"
              src={post.postVideo}
            >
              Your browser does not support the video tag.
            </video>
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{post.postName}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.postDescription}
            </p>
            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => onEditPost(post)}>
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(post.id)}
                disabled={deletingId === post.id}
              >
                {deletingId === post.id ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};