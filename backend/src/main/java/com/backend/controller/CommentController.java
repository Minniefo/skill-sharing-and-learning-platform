package com.backend.controller;

import com.backend.model.Comment;
import com.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "api/v1/")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/getcomments")
    public List<Comment> getComments() {
        return commentService.getAllComments();
    }

    @PostMapping("/addcomment")
    public Comment addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @PutMapping("/updatecomment")
    public Comment updateComment(@RequestBody Comment comment) {
        return commentService.updateComment(comment);
    }

    @DeleteMapping("/deletecomment")
    public String deleteComment(@RequestBody Comment comment) {
        return commentService.deleteComment(comment);
    }
}
