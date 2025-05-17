package com.edu.skillshare.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostReq {
    private String postName;
    private String postDescription;
    private String postImage;
    private String postImage1;
    private String postImage2;
    private String postVideo;
}
