package com.edu.skillshare.repository;

import com.edu.skillshare.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUid(String uid);
}