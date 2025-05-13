package com.edu.skillshare.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection  = "posts")
public class Post {
    @Id
    private String id;
    private String postName;
    private String postDescription;
    private String postImage;
}

