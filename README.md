# skill-sharing-and-learning-platform

# Learning Plan & Progress Tracking Module

This module is part of a Skill-Sharing Platform developed using Spring Boot for the backend and TypeScript for the frontend. The purpose of this module is to allow users to create, manage, and track personalized learning plans.

📌 Features

### 🔧 Backend (Spring Boot)
- Create and store learning tasks in the `learningPlans` collection.
- Each task includes:
  - `title`
  - `description`
  - `due date` (calendar-based)
  - `priority` (based on due date proximity)
  - `progress status` (`Not Started`, `In Progress`, `Completed`)
- Update task details and progress status.
- Retrieve all tasks sorted by priority (soonest due date first).
- Retrieve tasks by specific user ID.
- Modify task details using `task ID`.
- Delete tasks and any associated PDF resources.

### 🌐 Frontend (TypeScript)
- Dashboard displays all tasks sorted by due date.
- Users can:
  - Add a new task (with title, description, calendar pop-up for due date)
  - View task cards with title, description, due date, status, and resource
  - Edit any field of a task (including uploading a new resource)
  - Delete tasks along with their associated PDFs
  - Mark tasks as complete

---

## 🧰 Tech Stack

### Backend
- Java 17
- Spring Boot 3+
- MongoDB 
- Spring Data
- Spring Web
- Spring Multipart File Handling

### Frontend
- TypeScript
- React 
- Axios / Fetch API
- HTML5, CSS
- Date-picker library for calendar popup
- [Vite](https://vitejs.dev/) 


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



