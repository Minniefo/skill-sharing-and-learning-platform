// src/pages/PostPage.tsx
import React, { useEffect, useState } from 'react';
import PostItem from '../components/posts/PostItem';
import NotificationList from '../components/notifications/NotificationList';
import { Post } from '../types';
import { fetchPosts } from '../services/api';

const demoPost = {
  id: "1",
  title: "Introduction to React Hooks",
  content: "React Hooks are a powerful feature that let you use state and other React features without writing a class. They were introduced in React 16.8 and have changed how we write React components.",
  authorName: "John Doe",
  authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
  createdAt: new Date().toISOString(),
  imageUrl: "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fmve37at43zl83h1nbu4r.png"
};

const PostPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchAndSetPosts = async () => {
          try {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
    
        fetchAndSetPosts();
      }, []);
    
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center">Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
        {posts.length > 0 ? (
            posts.map((post) => <PostItem key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-500">No posts available.</p>
          )}
        </div>
        <div>
          <NotificationList />
        </div>
      </div>
    </div>
  );
};


export default PostPage;
