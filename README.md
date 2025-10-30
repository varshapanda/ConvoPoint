# ConvoPoint

ConvoPoint is a full-stack real-time chat application that enables users to communicate instantly with authentication, online status tracking, image sharing, and notification sounds. The system is designed with a custom-built authentication flow and socket server, ensuring full control and transparency across backend and frontend operations.

---

## Overview

ConvoPoint is a scalable and modern chat platform developed without relying on external real-time or authentication services. It features a secure REST API, live message synchronization via Socket.io, and seamless media handling through Cloudinary. Upon registration, users receive an automated welcome email handled by a background service using Resend.

This project demonstrates production-grade patterns for building reliable real-time applications with a complete stack, optimized for performance and maintainability.

---

## Key Features

- **User Authentication** – Secure registration and login using JWT-based authorization.  
- **Real-Time Messaging** – Low-latency communication with Socket.io for instant chat delivery.  
- **Online Presence Indicators** – Track active users and their connection status.  
- **Image Uploads** – Upload and share images directly in the chat using Cloudinary.  
- **Email Notifications (Testing Mode)** – Welcome email functionality via Resend (currently limited).  
- **Rate Limiting** – Arcjet integration to prevent abuse and enhance API security.  
- **Typing and Notification Sounds** – Audio feedback for message typing and delivery.  
- **Modern UI/UX** – Responsive, accessible, and minimal frontend with Tailwind CSS and daisyUI.  
- **State Management** – Global state synchronization handled via Zustand.  

---

## Tech Stack

### Backend
- Node.js  
- Express.js  
- Socket.io  
- MongoDB and Mongoose  
- JSON Web Tokens (JWT)  
- REST APIs
- Cloudinary  
- Resend (Email Service)  
- Arcjet (Rate Limiting)  

### Frontend
- React  
- Tailwind CSS  
- daisyUI  
- Zustand 
- socket.io-client
- Axios 


---

## Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```bash
NODE_ENV=production
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email@example.com
EMAIL_FROM_NAME=ConvoPoint

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_CLOUD_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
```

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/varshapanda/ConvoPoint.git
cd ConvoPoint
```

### 2. Install Dependencies
```bash
# Backend
cd Backend
npm install

# Frontend
cd Frontend
npm install
```

### 3. Run Development Servers
```bash
# Start backend
cd Backend
npm run dev

# Start frontend
cd Frontend
npm run dev
```

- Backend: http://localhost:8080  
- Frontend: http://localhost:5173

---

### Deployment Configuration

#### Root `package.json`

```json

  "scripts": {
    "build": "npm install --prefix Backend && npm install --prefix Frontend && npm run build --prefix Frontend",
    "start": "npm run start --prefix Backend"
    },

```

### Build and Start Commands

Execute the following commands from the **project root**:

```bash
# Install dependencies and build frontend
npm run build

# Start the backend server
npm start
```

### Sevalla Deployment

- The app is deployed on **Sevalla** under a unified project setup.  
- Environment variables are configured via the Sevalla dashboard.  
- Ensure `NODE_ENV` is set to **production**.  
- Verify that your **frontend and backend URLs** are correctly linked to prevent CORS issues.  
- The backend serves the API, while the built frontend is hosted through Sevalla’s static deployment system.



---

## System Architecture

- The backend follows a layered architecture separating routes, controllers, and middleware for maintainability.  
- WebSocket events are managed through a dedicated Socket.io server instance.  
- JWT-based authentication secures all protected routes.  
- Email dispatching runs asynchronously to ensure performance.  
- Frontend uses Zustand for lightweight state management with minimal re-renders.  
- API rate limiting via Arcjet and request validation guard the system against spam and bot attempts.  



