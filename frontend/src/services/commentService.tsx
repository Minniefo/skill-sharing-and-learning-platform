import api from './api';

const commentService = {
  getCommentsByPostId: (postId: string) => {
    return api.get(`/comments/post/${postId}`);
  },

  addComment: (postId: string, content: string, parentId: string | null = null) => {
    console.log('Sending comment data:', { postId, content, parentId });
    return api
      .post('/comments', { postId, content, parentId })
      .then((response) => {
        console.log('Comment added successfully:', response.data);
        return response;
      })
      .catch((error) => {
        console.error(
          'Error adding comment:',
          error.response ? error.response.data : error.message
        );
        throw error;
      });
  },

  updateComment: (commentId: string, content: string) => {
    return api.put(`/comments/${commentId}`, { content });
  },

  deleteComment: (commentId: string) => {
    return api.delete(`/comments/${commentId}`);
  },
};

export default commentService;
