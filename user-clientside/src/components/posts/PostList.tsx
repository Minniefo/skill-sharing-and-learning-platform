import React, { useState } from 'react';
import type { Post } from '../../types/index';
import { Button } from '../ui/Button';
import { deletePost } from '../../services/api';
import { PostModal } from './PostModal'; // Import the PostModal component

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
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // State for selected post
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [currentSlide, setCurrentSlide] = useState<{ [key: string]: 'image' | 'video' }>({}); // Track the current slide for each post

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

  const handlePostClick = (post: Post) => {
    setSelectedPost(post); // Set the selected post
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setSelectedPost(null); // Clear the selected post
    setIsModalOpen(false); // Close the modal
  };

  const toggleSlide = (postId: string) => {
    setCurrentSlide((prev) => ({
      ...prev,
      [postId]: prev[postId] === 'image' ? 'video' : 'image'
    }));
  };

  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No posts found. Create your first post above!
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post)} // Open modal on post click
          >
            <div className="relative">
              {currentSlide[post.id] !== 'video' && post.postImage && (
                <img
                  src={post.postImage}
                  alt={post.postName}
                  className="w-full h-110 object-cover"
                />
              )}
              {currentSlide[post.id] === 'video' && post.postVideo && (
                <video
                  controls
                  className="w-full h-110 object-cover"
                  src={post.postVideo}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {post.postImage && post.postVideo && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the modal
                    toggleSlide(post.id);
                  }}
                  className="absolute bottom-2 right-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  {currentSlide[post.id] === 'video' ? 'View Image' : 'View Video'}
                </button>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{post.postName}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.postDescription}
              </p>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.createdDate}
              </p>
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPost(post);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  disabled={deletingId === post.id}
                >
                  {deletingId === post.id ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Render the modal */}
      {isModalOpen && selectedPost && (
        <PostModal post={selectedPost} onClose={closeModal} />
      )}
    </>
  );
};