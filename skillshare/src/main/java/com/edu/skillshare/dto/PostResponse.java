package com.edu.skillshare.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponse {
    private String id;
    private String postName;
    private String postDescription;
    private String postImage;
    private String postVideo;
    private Instant createdDate;
    private Instant updatedDate;
}
