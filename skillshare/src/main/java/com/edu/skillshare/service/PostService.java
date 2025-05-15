package com.edu.skillshare.service;

import com.edu.skillshare.dto.CreatePostReq;
import com.edu.skillshare.dto.PostReq;
import com.edu.skillshare.dto.PostResponse;

import java.util.List;

public interface PostService {
    PostResponse createPost(CreatePostReq postRequest);
    PostResponse getPostById(String id);
    List<PostResponse> getPostByUserId(String userId);
    List<PostResponse> getAllPosts();
    PostResponse updatePost(String id, PostReq postRequest);
    void deletePost(String id);
}
