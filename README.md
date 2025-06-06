# 🩸 BloodWeb - A Real-Time Blood Donation Platform

BloodWeb is a full-stack blood donation request platform built to facilitate emergency communication between blood donors and recipients. Designed with accessibility and urgency in mind, the system supports live notifications, request management, and secure role-based interactions.

## 🚀 Live Demo

Frontend: [https://bloodweb2.netlify.app](https://bloodweb2.netlify.app)  
Backend: [https://bloodweb-dbackend.onrender.com](https://bloodweb-dbackend.onrender.com)

## 📂 Project Repositories

- [Frontend GitHub Repo](https://github.com/Sciber766/BloodWeb)
- [Backend GitHub Repo](https://github.com/Sciber766/BloodWeb-dBackend)

---

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Backend Routes](#backend-routes)
- [Socket.IO Integration](#socketio-integration)
- [Project Learnings](#project-learnings)
- [How to Run Locally](#how-to-run-locally)
- [Screenshots](#screenshots)

---

## 🧩 Project Overview

BloodWeb helps blood donors and recipients connect during emergencies. It provides a dashboard where users can request blood, accept requests, and get real-time notifications.

## ✨ Features

- Secure authentication using JWT
- Role-based views for donor/requestor
- Emergency contact toggles
- Real-time Socket.IO notifications
- Blood request creation, acceptance & tracking
- Donation history tracking
- Mobile responsive UI

## 🛠 Tech Stack

**Frontend:** HTML, CSS, JavaScript, FontAwesome, Netlify  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, CORS  
**Real-time:** Socket.IO (with room-based targeting)  
**Database:** MongoDB (cloud) via Mongoose schemas  
**Deployment:** Frontend on Netlify, Backend on Render

## 🧱 Architecture

- `/routes`: All Express route handlers (auth, user, request)
- `/models`: Mongoose schemas for User, Request, Donation
- `index.js`: Express + Socket.IO setup + MongoDB connection
- `socket.js`: Custom Socket.IO export logic
- Frontend: Vanilla JS DOM manipulation, fetch API, UI logic

## 📡 Socket.IO Integration

- Users join rooms based on their MongoDB user ID
- Notifications (new requests, acceptances) are emitted in real-time
- Used in:
  - `bloodRequest.js` route (accept request)
  - Notification logic on frontend
- Improves UX by updating views without full refresh

## 🔐 Backend Routes

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login and get token

### User
- `GET /api/user/profile` — Get user profile
- `PATCH /api/user/availability` — Toggle donor availability
- `PATCH /api/user/emergency` — Toggle emergency status

### Requests
- `POST /api/request/blood-request` — Create new request
- `GET /api/request/match` — Fetch matching requests
- `GET /api/request/mine` — Fetch own requests
- `DELETE /api/request/:id` — Delete request
- `PUT /api/request/:id/accept` — Accept a request

### Notifications
- `GET /api/request/notifications` — Get user's notifications

## 🧠 Project Learnings

- JWT-based token handling
- Route authorization and middleware
- How to structure MongoDB schemas for role-based systems
- Socket.IO real-time room joining and event emitting
- Frontend-backend coordination and debugging (CORS, tokens)
- Deployment challenges on Render (cold starts, logs, 500 errors)

## 📷 Screenshots

> Add your screenshots here later, like:
> - Dashboard with pending requests
> - Live notifications
> - Accept button logic

## 🖥 How to Run Locally

### Backend

```bash
cd BloodWeb-dBackend
npm install
node index.js
```

### Frontend

```bash
cd BloodWeb
open index.html or use Live Server extension
```

---

## 🙌 Credits

Developed by [Naman Tiwari](https://github.com/Sciber766) with AI-powered backend guidance, error handling, and learning-by-debugging ❤️