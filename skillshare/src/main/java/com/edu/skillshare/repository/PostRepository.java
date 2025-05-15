package com.edu.skillshare.repository;


import com.edu.skillshare.document.Post;
import com.edu.skillshare.document.UserAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String>{
    List<Post> findByUserId(String userId);

}