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
    postName: post.postName,
    postDescription: post.postDescription,
    postImage: post.postImage,
    postImage1: post.postImage1 || '',
    postImage2: post.postImage2 || '',
    postVideo: post.postVideo
  });

  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    postImage: null,
    postImage1: null,
    postImage2: null
  });

  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({
    postImage: post.postImage,
    postImage1: post.postImage1 || '',
    postImage2: post.postImage2 || ''
  });

  const [isUploading, setIsUploading] = useState<{ [key: string]: boolean }>({
    postImage: false,
    postImage1: false,
    postImage2: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PostFormData) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFiles((prev) => ({ ...prev, [field]: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrls((prev) => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (field: keyof PostFormData) => {
    const file = files[field];
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    try {
      setIsUploading((prev) => ({ ...prev, [field]: true }));
      setError(null);
      const uploadedUrl = await uploadImageToGCS(file);
      setFormData((prev) => ({ ...prev, [field]: uploadedUrl }));
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.postName.trim()) {
      setError('Post name is required');
      return;
    }
    if (!formData.postDescription.trim()) {
      setError('Post description is required');
      return;
    }
    if (!formData.postImage) {
      setError('Please upload at least the main image');
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

  const renderImageField = (label: string, field: keyof PostFormData) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center mb-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, field)}
          className="w-full"
        />
        <Button
          type="button"
          onClick={() => handleUpload(field)}
          disabled={!files[field] || isUploading[field]}
          className="ml-2 whitespace-nowrap"
        >
          {isUploading[field] ? 'Uploading...' : 'Upload New'}
        </Button>
      </div>
      {previewUrls[field] && (
        <div className="mt-2">
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <img
            src={previewUrls[field]}
            alt="Preview"
            className="w-full max-w-md h-auto rounded border border-gray-300"
          />
        </div>
      )}
      {formData[field] !== post[field] && formData[field] !== '' && (
        <p className="text-sm text-green-600 mt-1">New image uploaded successfully!</p>
      )}
    </div>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Name
          </label>
          <input
            type="text"
            name="postName"
            value={formData.postName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="postDescription"
            value={formData.postDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post description"
          />
        </div>

        {/* Dynamic Image Fields */}
        {renderImageField('Main Post Image', 'postImage')}
        {renderImageField('Photo 1 (optional)', 'postImage1')}
        {renderImageField('Photo 2 (optional)', 'postImage2')}

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};
