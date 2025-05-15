import React, { useEffect, useState } from 'react';
import { CreatePost } from '../components/posts/CreatePost';
import { PostList } from '../components/posts/PostList';
import { EditPost } from '../components/posts/EditPost';
import { fetchPostByUserId } from '../services/api';
import type { Post } from '../types/index';
export const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  useEffect(() => {
    const getPosts = async () => {
      try {
        // Retrieve user object from local storage
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          const userId = parsedUser.uid;

          // Fetch posts by userId
          const fetchedPosts = await fetchPostByUserId(userId);
          setPosts(fetchedPosts);
        } else {
          console.error('No user found in local storage');
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);
  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };
  const handlePostUpdated = (updatedPost: Post) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
    setEditingPost(null);
  };
  const handlePostDeleted = (deletedPostId: string) => {
    setPosts(posts.filter(post => post.id !== deletedPostId));
  };
  return <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Post Management System
        </h1>
        {editingPost ? <EditPost post={editingPost} onPostUpdated={handlePostUpdated} onCancel={() => setEditingPost(null)} /> : <CreatePost onPostCreated={handlePostCreated} />}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">All Posts</h2>
          {loading ? <p className="text-center">Loading posts...</p> : <PostList posts={posts} onEditPost={setEditingPost} onDeletePost={handlePostDeleted} />}
        </div>
      </div>
    </div>;
}