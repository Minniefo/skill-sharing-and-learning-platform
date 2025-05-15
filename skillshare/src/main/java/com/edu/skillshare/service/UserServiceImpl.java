package com.edu.skillshare.service;

import com.edu.skillshare.document.User;
import com.edu.skillshare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public List<User> getAllUsers(){return this.userRepository.findAll();}

}
