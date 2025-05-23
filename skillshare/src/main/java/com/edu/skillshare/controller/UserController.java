package com.edu.skillshare.controller;


import com.edu.skillshare.document.User;
import com.edu.skillshare.dto.UserDTO;
import com.edu.skillshare.repository.UserRepository;
import com.edu.skillshare.service.UserService;
import com.google.firebase.auth.ExportedUserRecord;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.ListUsersPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UserDTO userDto) {

        try {
            String idToken = authHeader.replace("Bearer ", "");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            if (!decodedToken.getUid().equals(userDto.getUid())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("UID mismatch");
            }

            Optional<User> existingUser = userRepository.findByUid(userDto.getUid());
            if (existingUser.isPresent()) {
                return ResponseEntity.ok(existingUser.get());
            }

            User user = new User();
            user.setUid(userDto.getUid());
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());

            userRepository.save(user);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
        }
    }
}
