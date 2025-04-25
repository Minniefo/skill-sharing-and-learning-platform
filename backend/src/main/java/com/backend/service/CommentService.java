package com.backend.service;

import com.backend.dto.CommentDTO;
import com.backend.model.Comment;
import com.backend.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<CommentDTO> getAllComments(){
        List<Comment> comments = commentRepository.findAll();
        return modelMapper.map(comments, new TypeToken<List<CommentDTO>>(){}.getType());
    }

    public CommentDTO addComment(CommentDTO commentDTO) {
        commentRepository.save(modelMapper.map(commentDTO, Comment.class));
        return commentDTO;
    }

    public CommentDTO updateComment(CommentDTO commentDTO) {
        commentRepository.save(modelMapper.map(commentDTO, Comment.class));
        return commentDTO;
    }

    public String deleteComment(CommentDTO commentDTO) {
        commentRepository.delete(modelMapper.map(commentDTO, Comment.class));
        return "Delete User";
    }
}
