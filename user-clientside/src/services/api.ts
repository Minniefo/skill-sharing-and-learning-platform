import type { Post, PostFormData } from '../types/index';
const API_URL = 'http://localhost:8083/api'; // Replace with your actual backend API URL
// Fetch all posts
export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};
// Fetch a single post
export const fetchPost = async (id: string): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
};
// Create a new post
export const createPost = async (postData: PostFormData): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};
// Update an existing post
export const updatePost = async (id: string, postData: PostFormData): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  });
  if (!response.ok) {
    throw new Error('Failed to update post');
  }
  return response.json();
};
// Delete a post
export const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete post');
  }
};