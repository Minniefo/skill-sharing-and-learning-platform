package com.edu.skillshare.service;

import com.edu.skillshare.document.Post;
import com.edu.skillshare.dto.CreatePostReq;
import com.edu.skillshare.dto.PostReq;
import com.edu.skillshare.dto.PostResponse;
import com.edu.skillshare.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;

    @Override
    public PostResponse createPost(CreatePostReq dto) {
        Post post = Post.builder()
                .userId((dto.getUserId()))
                .userName((dto.getUserName()))
                .postName(dto.getPostName())
                .postDescription(dto.getPostDescription())
                .postImage(dto.getPostImage())
                .postImage1(dto.getPostImage1())
                .postImage2(dto.getPostImage2())
                .postVideo(dto.getPostVideo())
                .createdDate(Instant.now())
                .updatedDate(Instant.now())
                .build();
        return mapToDto(postRepository.save(post));
    }

    @Override
    public PostResponse getPostById(String id) {
        return postRepository.findById(id)
                .map(this::mapToDto)
                .orElse(null);
    }

    @Override
    public String getPostOwner(String id) {
        return postRepository.findById(id).get().getUserId();
    }

    @Override
    public List<PostResponse> getPostByUserId(String userId) {
        return postRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse updatePost(String id, PostReq dto) {
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setPostName(dto.getPostName());
            post.setPostDescription(dto.getPostDescription());
            post.setPostImage(dto.getPostImage());
            post.setPostImage1(dto.getPostImage1());
            post.setPostImage2(dto.getPostImage2());
            post.setPostVideo(dto.getPostVideo());
            return mapToDto(postRepository.save(post));
        }
        return null;
    }

    @Override
    public void deletePost(String id) {
        postRepository.deleteById(id);
    }

    private PostResponse mapToDto(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .userId(post.getUserId())
                .userName(post.getUserName())
                .postName(post.getPostName())
                .postDescription(post.getPostDescription())
                .postImage(post.getPostImage())
                .postImage1(post.getPostImage1())
                .postImage2(post.getPostImage2())
                .postVideo(post.getPostVideo())
                .createdDate(post.getCreatedDate())
                .updatedDate(post.getUpdatedDate())
                .build();
    }
}
