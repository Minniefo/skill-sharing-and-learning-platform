import React, { useState } from 'react';
import type { Post } from '../../types/index';
import { Button } from '../ui/Button';
import { deletePost } from '../../services/api';
import { PostModal } from './PostModal';

interface PostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
  onDeletePost: (id: string) => void;
}

type SlideKey = 'image' | 'image1' | 'image2' | 'video';

export const PostList: React.FC<PostListProps> = ({
  posts,
  onEditPost,
  onDeletePost
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track which slide is showing for each post by id
  const [currentSlide, setCurrentSlide] = useState<Record<string, SlideKey>>({});

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
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const changeSlide = (postId: string, slide: SlideKey) => {
    setCurrentSlide(prev => ({ ...prev, [postId]: slide }));
  };

  const renderMedia = (post: Post) => {
    const slide = currentSlide[post.id] || 'image';

    if (slide === 'video' && post.postVideo) {
      return (
        <video
          controls
          className="w-full h-110 object-cover"
          src={post.postVideo}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (slide === 'image1' && post.postImage1) {
      return (
        <img
          src={post.postImage1}
          alt={`${post.postName} - photo 1`}
          className="w-full h-110 object-cover"
        />
      );
    }

    if (slide === 'image2' && post.postImage2) {
      return (
        <img
          src={post.postImage2}
          alt={`${post.postName} - photo 2`}
          className="w-full h-110 object-cover"
        />
      );
    }

    // Fallback to main image
    return (
      <img
        src={post.postImage}
        alt={post.postName}
        className="w-full h-110 object-cover"
      />
    );
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
        {posts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handlePostClick(post)}
          >
            <div className="relative">
              {renderMedia(post)}

              {/* Slide‑toggle buttons (only for available assets) */}
              <div className="absolute bottom-2 right-2 flex gap-2">
                {post.postImage && (
                  <SlideButton
                    label="Main Photo"
                    active={currentSlide[post.id] === 'image' || !currentSlide[post.id]}
                    onClick={e => {
                      e.stopPropagation();
                      changeSlide(post.id, 'image');
                    }}
                  />
                )}
                {post.postImage1 && (
                  <SlideButton
                    label="Photo 1"
                    active={currentSlide[post.id] === 'image1'}
                    onClick={e => {
                      e.stopPropagation();
                      changeSlide(post.id, 'image1');
                    }}
                  />
                )}
                {post.postImage2 && (
                  <SlideButton
                    label="Photo 2"
                    active={currentSlide[post.id] === 'image2'}
                    onClick={e => {
                      e.stopPropagation();
                      changeSlide(post.id, 'image2');
                    }}
                  />
                )}
                {post.postVideo && (
                  <SlideButton
                    label="Video"
                    active={currentSlide[post.id] === 'video'}
                    onClick={e => {
                      e.stopPropagation();
                      changeSlide(post.id, 'video');
                    }}
                  />
                )}
              </div>
            </div>

            <div className="p-4">
              <h4 className="text-sm text-gray-500">{post.userName}</h4>
              <h3 className="text-lg font-semibold mb-2">{post.postName}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.postDescription}
              </p>
              <p className="text-xs text-gray-400 mb-4">{post.createdDate}</p>
              <div className="flex justify-between">
                <Button
                  variant="secondary"
                  onClick={e => {
                    e.stopPropagation();
                    onEditPost(post);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={e => {
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

      {isModalOpen && selectedPost && (
        <PostModal post={selectedPost} onClose={closeModal} />
      )}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Small, reusable pill‑style slide button                            */
interface SlideButtonProps {
  label: string;
  active: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const SlideButton: React.FC<SlideButtonProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-xs rounded 
      ${active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
  >
    {label}
  </button>
);
