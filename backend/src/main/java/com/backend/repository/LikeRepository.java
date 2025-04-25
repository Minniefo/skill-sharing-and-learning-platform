package com.backend.repository;

import com.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, String> {
    int countByCommentId(String commentId);
    boolean existsByUserIdAndCommentId(String userId, String commentId);
    void deleteByUserIdAndCommentId(String userId, String commentId);
}

