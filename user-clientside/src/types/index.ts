export interface Post {
  id: string;
  postName: string;
  postDescription: string;
  postImage: string;
  createdAt?: string;
}
export interface PostFormData {
  postName: string;
  postDescription: string;
  postImage: string;
}