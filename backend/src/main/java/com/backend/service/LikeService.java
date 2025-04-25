package com.backend.service;

import com.backend.model.Like;
import com.backend.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;

    public int likeComment(String userId, String commentId) {
        if (!likeRepository.existsByUserIdAndCommentId(userId, commentId)) {
            Like like = new Like(UUID.randomUUID().toString(), userId, commentId);
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
}
