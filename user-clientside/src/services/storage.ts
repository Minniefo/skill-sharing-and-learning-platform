// src/utils/gcsUpload.ts

const GCS_BUCKET_NAME = 'skillsharebucket'; // Your bucket name

export const uploadImageToGCS = async (file: File): Promise<string> => {
  const timestamp = new Date().getTime();
  const uniqueFileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
  const uploadUrl = `https://storage.googleapis.com/upload/storage/v1/b/${GCS_BUCKET_NAME}/o?uploadType=media&name=${uniqueFileName}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Content-Type': file.type, // image/jpeg, image/png, etc.
      },
      body: file,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload failed: ${error}`);
    }

    // If upload is successful, return the public URL of the image
    return `https://storage.googleapis.com/${GCS_BUCKET_NAME}/${uniqueFileName}`;
  } catch (error) {
    console.error('Error uploading image to GCS:', error);
    throw new Error('Failed to upload image');
  }
};