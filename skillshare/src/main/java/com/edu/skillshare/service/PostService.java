package com.edu.skillshare.service;

import com.edu.skillshare.dto.PostReq;
import com.edu.skillshare.dto.PostResponse;

import java.util.List;

public interface PostService {
    PostResponse createPost(PostReq postRequest);
    PostResponse getPostById(String id);
    List<PostResponse> getAllPosts();
    PostResponse updatePost(String id, PostReq postRequest);
    void deletePost(String id);
}
