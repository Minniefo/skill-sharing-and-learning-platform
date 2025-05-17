export interface Post {
  id: string;
  userId: string;
  userName: string;
  postName: string;
  postDescription: string;
  postImage: string;
  postImage1?: string,
  postImage2?: string,
  postVideo: string; 
  createdDate?: string;
}
export interface PostFormData {
  postName: string;
  postDescription: string;
  postImage: string;
  postImage1?: string,
  postImage2?: string,
  postVideo: string; 
}

export interface CreatePostFormData {
  userId: string;
  userName: string;
  postName: string;
  postDescription: string;
  postImage: string;
  postImage1?: string,
  postImage2?: string,
  postVideo: string; 
}