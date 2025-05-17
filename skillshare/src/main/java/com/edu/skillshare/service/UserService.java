package com.edu.skillshare.service;

import com.edu.skillshare.document.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    String getUserIdByName(String name);
    String getNameByUserId(String userId);
}
