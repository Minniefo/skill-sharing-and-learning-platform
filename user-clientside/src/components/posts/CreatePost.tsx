import React, { useEffect, useState } from "react";
import { uploadImageToGCS } from "../../services/storage";
import { createPost } from "../../services/api";
import type { Post, CreatePostFormData } from "../../types/index";
import { Button } from "../ui/Button";

interface CreatePostProps {
  onPostCreated: (post: Post) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [formData, setFormData] = useState<CreatePostFormData>({
    userId: "",
    userName: "",
    postName: "",
    postDescription: "",
    postImage: "",
    postImage1: "",
    postImage2: "",
    postVideo: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const [file1, setFile1] = useState<File | null>(null);
  const [previewUrl1, setPreviewUrl1] = useState<string>("");

  const [file2, setFile2] = useState<File | null>(null);
  const [previewUrl2, setPreviewUrl2] = useState<string>("");

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isUploading1, setIsUploading1] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setFormData((prev) => ({
          ...prev,
          userId: parsedUser.uid || "",
          userName: parsedUser.name || "",
        }));
      } catch (error) {
        console.error("Error parsing user data from local storage:", error);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileFn: React.Dispatch<React.SetStateAction<File | null>>,
    setPreviewUrlFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileFn(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrlFn(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const uploadFile = async (
    file: File | null,
    setIsUploadingFn: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorFn: React.Dispatch<React.SetStateAction<string | null>>,
    setFormField: keyof CreatePostFormData
  ) => {
    if (!file) {
      setErrorFn("Please select a file to upload");
      return;
    }
    try {
      setIsUploadingFn(true);
      setErrorFn(null);
      const url = await uploadImageToGCS(file);
      setFormData((prev) => ({ ...prev, [setFormField]: url }));
    } catch (error) {
      console.error("Upload failed:", error);
      setErrorFn("Upload failed. Please try again.");
    } finally {
      setIsUploadingFn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.postName.trim()) return setError("Post name is required");
    if (!formData.postDescription.trim())
      return setError("Post description is required");
    if (!formData.postImage)
      return setError("Please upload a main image first");

    try {
      setIsSubmitting(true);
      setError(null);
      const newPost = await createPost(formData);
      onPostCreated(newPost);
      setFormData({
        userId: "",
        userName: "",
        postName: "",
        postDescription: "",
        postImage: "",
        postImage1: "",
        postImage2: "",
        postVideo: "",
      });
      setFile(null);
      setFile1(null);
      setFile2(null);
      setVideoFile(null);
      setPreviewUrl("");
      setPreviewUrl1("");
      setPreviewUrl2("");
    } catch (error) {
      console.error("Error creating post:", error);
      setError("Failed to create post. Please try again.");
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
          <label
            htmlFor="postName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Name
          </label>
          <input
            type="text"
            id="postName"
            name="postName"
            value={formData.postName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:border-blue-500"
            placeholder="Enter post name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="postDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="postDescription"
            name="postDescription"
            value={formData.postDescription}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-md focus:ring focus:border-blue-500"
            placeholder="Enter post description"
          />
        </div>

        {/* Main Image Upload */}
        <ImageUploader
          id="postImage"
          label="Main Image"
          file={file}
          previewUrl={previewUrl}
          isUploading={isUploading}
          onFileChange={(e) => handleFileChange(e, setFile, setPreviewUrl)}
          onUpload={() =>
            uploadFile(file, setIsUploading, setError, "postImage")
          }
          uploadedUrl={formData.postImage}
        />

        {/* Optional Image 1 Upload */}
        <ImageUploader
          id="postImage1"
          label="Optional Image 1"
          file={file1}
          previewUrl={previewUrl1}
          isUploading={isUploading1}
          onFileChange={(e) => handleFileChange(e, setFile1, setPreviewUrl1)}
          onUpload={() =>
            uploadFile(file1, setIsUploading1, setError, "postImage1")
          }
          uploadedUrl={formData.postImage1}
        />

        {/* Optional Image 2 Upload */}
        <ImageUploader
          id="postImage2"
          label="Optional Image 2"
          file={file2}
          previewUrl={previewUrl2}
          isUploading={isUploading2}
          onFileChange={(e) => handleFileChange(e, setFile2, setPreviewUrl2)}
          onUpload={() =>
            uploadFile(file2, setIsUploading2, setError, "postImage2")
          }
          uploadedUrl={formData.postImage2}
        />

        {/* Video Upload */}
        <div className="mb-4">
          <label
            htmlFor="postVideo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Video
          </label>
          <div className="flex items-center mb-2">
            <input
              type="file"
              id="postVideo"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files) setVideoFile(e.target.files[0]);
              }}
              className="w-full"
            />
            <Button
              type="button"
              onClick={() =>
                uploadFile(
                  videoFile,
                  setIsUploadingVideo,
                  setError,
                  "postVideo"
                )
              }
              disabled={!videoFile || isUploadingVideo}
              className="ml-2"
            >
              {isUploadingVideo ? "Uploading..." : "Upload"}
            </Button>
          </div>
          {formData.postVideo && (
            <p className="text-sm text-green-600">
              Video uploaded! URL: {formData.postVideo}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || !formData.postImage}>
            {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
};

// Reusable ImageUploader component
interface ImageUploaderProps {
  id: string;
  label: string;
  file: File | null;
  previewUrl: string;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  uploadedUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  id,
  label,
  file,
  previewUrl,
  isUploading,
  onFileChange,
  onUpload,
  uploadedUrl,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="flex items-center mb-2">
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onFileChange}
        className="w-full"
      />
      <Button
        type="button"
        onClick={onUpload}
        disabled={!file || isUploading}
        className="ml-2 whitespace-nowrap"
      >
        {isUploading ? "Uploading..." : "Upload"}
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
    {uploadedUrl && (
      <p className="text-sm text-green-600 mt-1">
        Uploaded! URL: {uploadedUrl}
      </p>
    )}
  </div>
);
