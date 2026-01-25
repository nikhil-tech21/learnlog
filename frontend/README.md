# 📚 LearnLog  
## AI-Driven Learning Platform

LearnLog is a full-stack learning management and productivity platform that helps students and developers organize notes, plan learning paths, chat with AI-like features, and manage daily goals in one place.

This project is designed to improve self-learning efficiency by combining note-taking, roadmap planning, and daily task tracking with a modern user interface.

---

## 🌟 Key Highlights

- Clean & Modern UI  
- Fast and Responsive  
- Beginner Friendly Codebase  
- Modular Architecture  
- Secure Authentication  
- Scalable Design  

---

## ✨ Features

### 🔐 Authentication
- User Login  
- User Signup  
- JWT-based Authentication  
- Protected Routes  

### 📚 Notes & Courses
- Create notes  
- Edit notes  
- Delete notes  
- Search notes  
- Drag and drop to rearrange notes  
- Recycle bin (restore deleted notes)  
- Permanent delete option  

### 🤖 AI Bot (Simulation)
- Keyword-based smart replies  
- Acts like real AI for selected keywords  
- Backend integrated  

### 🗺️ Roadmap Generator
- Generate learning roadmap  
- Save roadmap to database  
- Load roadmap from database  

### 💬 Chat Room
- Send messages  
- Store chat history  
- Load previous messages  
- AI-like responses  

### 🗓️ Daily Routine / Goals
- 20-row goal checklist  
- Checkbox appears only when text is written  
- Remove icon appears only when text is written  
- Attractive container UI  
- Strike-through completed goals  

---

## 🧠 Application Pages

- Login Page  
- Signup Page  
- Dashboard  
- Summarizer  
- Bot  
- Roadmap  
- Chat  
- Daily Routine  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- React Router  
- CSS  
- Axios  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  
- CORS  

---

## 📂 Project Structure

frontend  
 └── src  
     ├── pages  
     ├── components  
     ├── services  
     ├── styles  
     ├── App.js  
     ├── index.js  

backend  
 ├── controllers  
 ├── routes  
 ├── models  
 ├── middleware  
 ├── config  
 └── server.js  

---

## 🔗 API Routes

### Auth Routes
- POST /api/auth/signup  
- POST /api/auth/login  

### Course Routes
- POST /api/course/create  
- GET /api/course/all  

### Roadmap Routes
- POST /api/roadmap/save  
- GET /api/roadmap/all  

### Chat Routes
- POST /api/chat/save  
- GET /api/chat/all  

### AI Routes
- POST /api/ai/ask  

---

## 🚀 How to Run the Project

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/learnlog.git

```
### Step 2: Run backend
cd backend
npm install
node server.js

### Step 3: Run frontend
cd frontend
npm install
npm start
```bash