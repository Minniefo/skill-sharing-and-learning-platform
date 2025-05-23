package com.edu.skillshare.service;


import com.edu.skillshare.document.Like;
import com.edu.skillshare.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LikeService {
    @Autowired
    private UserService userService;

    @Autowired
    private LikeRepository likeRepository;
    
    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private PostService postService; // You'll need to create this service

    public int likeComment(String userId, String commentId) {
        if (!likeRepository.existsByUserIdAndCommentId(userId, commentId)) {
            Like like = new Like(UUID.randomUUID().toString(), userId, commentId, null);
            likeRepository.save(like);
        }
        return likeRepository.countByCommentId(commentId);
    }

    public int unlikeComment(String userId, String commentId) {
        if (likeRepository.existsByUserIdAndCommentId(userId, commentId)) {
            likeRepository.deleteByUserIdAndCommentId(userId, commentId);
        }
        return likeRepository.countByCommentId(commentId);
    }

    public int getLikeCount(String commentId) {
        return likeRepository.countByCommentId(commentId);
    }
    
    public List<Like> getLikesByPostId(String postId) {
        return likeRepository.findByPostId(postId);
    }
    
    public boolean checkIfUserLikedPost(String userId, String postId) {
        return likeRepository.existsByUserIdAndPostId(userId, postId);
    }
    
    public void toggleLike(String userId, String postId) {
        boolean alreadyLiked = likeRepository.existsByUserIdAndPostId(userId, postId);
        
        if (alreadyLiked) {
            likeRepository.deleteByUserIdAndPostId(userId, postId);
        } else {
            Like like = new Like(UUID.randomUUID().toString(), userId, null, postId);
            likeRepository.save(like);
            
            // Create notification for the post owner
            String postOwnerId = postService.getPostOwner(postId);
            String actorName = getUsernameById(userId);
            
            // Always create notification for the post owner
            notificationService.createLikeNotification(postOwnerId, postId, userId, actorName);
            
            // Also create a self-notification for the liker
            if (!postOwnerId.equals(userId)) {
                notificationService.createNotification(
                    userId, 
                    "You liked a post", 
                    "SELF_LIKE", 
                    "/posts/" + postId,
                    postId,
                    null,
                    userId,
                    actorName
                );
            }
        }
    }

    // Helper method to get username - in a real app, this would query your user database
    private String getUsernameById(String userId) {
        //if ("admin123".equals(userId)) {
          //  return "Admin";
        //}
        return userService.getNameByUserId(userId);
    }
}
