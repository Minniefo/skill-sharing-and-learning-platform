package com.backend.service;

import com.backend.model.Comment;
import com.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    // Fetch all comments
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // Add a new comment
    public Comment addComment(Comment comment) {
        return commentRepository.save(comment);
    }

    // Update an existing comment safely (preserving ID)
    public Comment updateComment(Comment comment) {
        Comment existingComment = commentRepository.findById(comment.getCommentId()).orElse(null);

        if (existingComment == null) {
            return null;
        }

        existingComment.setComment(comment.getComment());
        //existingComment.setPostId(comment.getPostId());

        // Save updated comment
        return commentRepository.save(existingComment);
    }

    // Delete a comment
    public String deleteComment(Comment comment) {
        commentRepository.delete(comment);
        return "Comment Deleted";
    }
}
