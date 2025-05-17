# skill-sharing-and-learning-platform

# 📝 Comment , Like and Notification Management

This branch implements a **Comment System** with **reply support** and **notification handling** using Spring Boot. It is designed to work with a frontend client and supports operations such as adding, updating, deleting, and replying to comments.

---

## ⚙️ Features

- Add comments and replies to posts
- Notify post owner and comment owner upon interaction
- Self-notifications for the commenter/replier
- RESTful API endpoints for comment operations
- Cross-Origin support for frontend integration

---

## 📡 API Endpoints

| Method | Endpoint                        | Description                   |
|--------|----------------------------------|-------------------------------|
| GET    | `/api/comments/post/{postId}`    | Get all comments for a post  |
| POST   | `/api/comments`                  | Add a new comment or reply   |
| PUT    | `/api/comments/{commentId}`      | Update a comment             |
| DELETE | `/api/comments/{commentId}`      | Delete a comment             |

---

Frontend

Key Features:
Display all comments and replies for a specific post
Add new comments or replies
Edit and delete existing comments
Real-time UI updates using state management
Structured API calls using Axios

/src
 ├── components
 │    └── CommentSection.jsx
 ├── api
 │    └── commentApi.js
 ├── pages
 │    └── PostPage.jsx
 └── App.jsx


