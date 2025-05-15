import React, { useEffect, useState } from 'react';
import { uploadImageToGCS } from '../../services/storage';
import { createPost } from '../../services/api';
import type { Post, CreatePostFormData } from '../../types/index';
import { Button } from '../ui/Button';

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [formData, setFormData] = useState<CreatePostFormData>({
    userId: '',
    userName: '',
    postName: '',
    postDescription: '',
    postImage: '',
    postVideo: '' // Added field for video URL
  });
  const [file, setFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null); // State for video file
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false); // State for video upload
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve user data from local storage
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setFormData((prevFormData) => ({
          ...prevFormData,
          userId: parsedUser.uid || '',
          userName: parsedUser.name || ''
        }));
      } catch (error) {
        console.error('Error parsing user data from local storage:', error);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedVideoFile = e.target.files[0];
      setVideoFile(selectedVideoFile);
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      setError('Please select an image to upload');
      return;
    }
    try {
      setIsUploading(true);
      setError(null);
      const postImage = await uploadImageToGCS(file);
      setFormData({
        ...formData,
        postImage
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadVideo = async () => {
    if (!videoFile) {
      setError('Please select a video to upload');
      return;
    }
    try {
      setIsUploadingVideo(true);
      setError(null);
      const postVideo = await uploadImageToGCS(videoFile); // Reusing the same upload function
      setFormData({
        ...formData,
        postVideo
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      setError('Failed to upload video. Please try again.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (!formData.postName.trim()) {
      setError('Post name is required');
      return;
    }
    if (!formData.postDescription.trim()) {
      setError('Post description is required');
      return;
    }
    if (!formData.postImage) {
      setError('Please upload an image first');
      return;
    }
    if (!formData.postVideo) {
      setError('Please upload a video first');
      return;
    }
    try {
      setIsSubmitting(true);
      setError(null);
      const newPost = await createPost(formData);
      onPostCreated(newPost);
      // Reset form
      setFormData({
        userId: '',
        userName: '',
        postName: '',
        postDescription: '',
        postImage: '',
        postVideo: '' // Reset video field
      });
      setFile(null);
      setVideoFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="postName" className="block text-sm font-medium text-gray-700 mb-1">
            Post Name
          </label>
          <input
            type="text"
            id="postName"
            name="postName"
            value={formData.postName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="postDescription"
            name="postDescription"
            value={formData.postDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post description"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postImage" className="block text-sm font-medium text-gray-700 mb-1">
            Post Image
          </label>
          <div className="flex items-center mb-2">
            <input
              type="file"
              id="postImage"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <Button
              type="button"
              onClick={handleUploadImage}
              disabled={!file || isUploading}
              className="ml-2 whitespace-nowrap"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
          {previewUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview:</p>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full max-w-md h-auto rounded border border-gray-300"
              />
            </div>
          )}
          {formData.postImage && (
            <p className="text-sm text-green-600 mt-1">
              Image uploaded successfully! URL: {formData.postImage}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postVideo" className="block text-sm font-medium text-gray-700 mb-1">
            Post Video
          </label>
          <div className="flex items-center mb-2">
            <input
              type="file"
              id="postVideo"
              accept="video/*"
              onChange={handleVideoFileChange}
              className="w-full"
            />
            <Button
              type="button"
              onClick={handleUploadVideo}
              disabled={!videoFile || isUploadingVideo}
              className="ml-2 whitespace-nowrap"
            >
              {isUploadingVideo ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
          {formData.postVideo && (
            <p className="text-sm text-green-600 mt-1">
              Video uploaded successfully! URL: {formData.postVideo}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !formData.postImage || !formData.postVideo}>
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};