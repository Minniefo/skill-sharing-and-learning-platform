package com.backend.controller;

import com.backend.dto.CommentDTO;
import com.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value ="api/v1/")

public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/getcomments")
    public List<CommentDTO> getComments() {
        return commentService.getAllComments();
    }

    @PostMapping("/addcomment")
    public CommentDTO addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.addComment(commentDTO);
    }

    @PutMapping("/updatecomment")
    public CommentDTO updateComment(@RequestBody CommentDTO commentDTO) {
        return commentService.updateComment(commentDTO);
    }

    @DeleteMapping("/deletecomment")
    public String deleteComment(@RequestBody CommentDTO commentDTO) {
        return commentService.deleteComment(commentDTO);
    }
}