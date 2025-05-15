import api from './api';
import { AxiosResponse } from 'axios';

interface LikeResponse {
  success: boolean;
  message?: string;
  data?: any;
}

const likeService = {
  getLikesByPostId: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    return api.get(`/likes/post/${postId}`);
  },

  toggleLike: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    return api.post(`/likes/toggle/${postId}`);
  },

  checkIfUserLikedPost: (postId: string): Promise<AxiosResponse<LikeResponse>> => {
    return api.get(`/likes/check/${postId}`);
  }
};

export default likeService;
