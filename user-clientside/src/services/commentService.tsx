import api from './api';

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const commentService = {
  getCommentsByPostId: (postId: string) => {
    return api.get(`/comments/post/${postId}`);
  },

  addComment: (postId: string, content: string, parentId: string | null = null) => {
    const user = getUserFromLocalStorage();
    console.log('Sending comment data:', { postId, content, parentId });
    return api
      .post('/comments', { postId, content, parentId, userId: user?.uid, username: user?.name })
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
