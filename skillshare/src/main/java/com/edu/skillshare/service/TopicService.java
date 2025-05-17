package com.edu.skillshare.service;

import java.util.List;

import com.edu.skillshare.document.Topic;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface TopicService {
    List<Topic> findAll();
    Topic findById(String id);
    Topic save(Topic topic, List<MultipartFile> files) throws IOException;
    Topic update(String id, Topic topic, List<MultipartFile> files) throws IOException;
    void delete(String id);
}