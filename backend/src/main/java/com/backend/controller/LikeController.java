package com.backend.controller;

import com.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/likes")
@CrossOrigin

public class LikeController {
        @Autowired
        private LikeService likeService;

        @PostMapping("/like")
        public int like(@RequestParam String userId, @RequestParam String commentId) {
            return likeService.likeComment(userId, commentId);
        }

        @PostMapping("/unlike")
        public int unlike(@RequestParam String userId, @RequestParam String commentId) {
            return likeService.unlikeComment(userId, commentId);
        }

        @GetMapping("/count")
        public int getLikeCount(@RequestParam String commentId) {
            return likeService.getLikeCount(commentId);
        }

}
