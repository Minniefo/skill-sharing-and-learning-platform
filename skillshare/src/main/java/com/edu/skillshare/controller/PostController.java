package com.edu.skillshare.controller;

import com.edu.skillshare.dto.CreatePostReq;
import com.edu.skillshare.dto.PostReq;
import com.edu.skillshare.dto.PostResponse;
import com.edu.skillshare.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {
    private  final PostService postService;

    @PostMapping
    public PostResponse createPost(@RequestBody CreatePostReq dto) {
        return postService.createPost(dto);
    }

    @GetMapping("/{id}")
    public PostResponse getPostById(@PathVariable String id) {
        return postService.getPostById(id);
    }

    @GetMapping("/user/{userid}")
    public List<PostResponse> getPostByUserId(@PathVariable String userid) {return postService.getPostByUserId(userid);}

    @GetMapping
    public List<PostResponse> getAllPosts() {
        return postService.getAllPosts();
    }

    @PutMapping("/{id}")
    public PostResponse updatePost(@PathVariable String id, @RequestBody PostReq dto) {
        return postService.updatePost(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) {
        postService.deletePost(id);
    }
}
