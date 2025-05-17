import api from './api';
import { AxiosResponse } from 'axios';

interface LikeResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const likeService = {
  getLikesByPostId: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    return api.get(`/likes/post/${postId}`);
  },

  toggleLike: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    const user = getUserFromLocalStorage();
    return api.post(`/likes/toggle/${postId}/${user?.uid}`);
  },

  checkIfUserLikedPost: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    const user = getUserFromLocalStorage();
    return api.get(`/likes/check/${postId}/${user?.uid}`);
  }
};

export default likeService;
