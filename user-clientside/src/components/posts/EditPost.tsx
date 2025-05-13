import React, { useState } from 'react';
import { uploadImageToGCS } from '../../services/storage';
import { updatePost } from '../../services/api';
import type { Post, PostFormData } from '../../types/index';
import { Button } from '../ui/Button';
interface EditPostProps {
  post: Post;
  onPostUpdated: (post: Post) => void;
  onCancel: () => void;
}
export const EditPost: React.FC<EditPostProps> = ({
  post,
  onPostUpdated,
  onCancel
}) => {
  const [formData, setFormData] = useState<PostFormData>({
    postName: post.postImage,
    postDescription: post.postDescription,
    postImage: post.postImage
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(post.postImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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
    try {
      setIsSubmitting(true);
      setError(null);
      const updatedPost = await updatePost(post.id, formData);
      onPostUpdated(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Post Name
          </label>
          <input type="text" id="name" name="name" value={formData.postName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter post name" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea id="description" name="description" value={formData.postDescription} onChange={handleInputChange} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Enter post description" />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Post Image
          </label>
          <div className="flex items-center mb-2">
            <input type="file" id="image" accept="image/*" onChange={handleFileChange} className="w-full" />
            <Button type="button" onClick={handleUploadImage} disabled={!file || isUploading} className="ml-2 whitespace-nowrap">
              {isUploading ? 'Uploading...' : 'Upload New'}
            </Button>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Current Image:</p>
            <img src={previewUrl} alt="Preview" className="w-full max-w-md h-auto rounded border border-gray-300" />
          </div>
          {formData.postImage !== post.postImage && <p className="text-sm text-green-600 mt-1">
              New image uploaded successfully!
            </p>}
        </div>
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </form>
    </div>;
};