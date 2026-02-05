# Youmicepa Task Manager

A robust full-stack Task Management application built with a modern tech stack, featuring a NestJS backend and a React frontend.

## 🚀 Projects

This repository contains two main modules:

| Project | Description | Path |
|---------|-------------|------|
| **[Backend](./task-manager-backend)** | RESTful API built with NestJS, Prisma, and MySQL | [`/task-manager-backend`](./task-manager-backend) |
| **[Frontend](./task-manger-frontend)** | Modern UI built with React, Vite, and Tailwind CSS | [`/task-manger-frontend`](./task-manger-frontend) |

## ✨ Features

-   **Authentication**: Secure Sign Up and Sign In flows using JWT and Bcrypt.
-   **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete).
-   **Security**: Password hashing, protected routes, and strict input validation.
-   **Modern UI**: Responsive design with Tailwind CSS and Dark Mode support.
-   **API Documentation**: Integrated Swagger UI for backend API exploration.

## 🛠️ Tech Stack

### Backend
-   **Framework**: NestJS
-   **Language**: TypeScript
-   **Database**: MySQL with Prisma ORM
-   **Authentication**: Passport-JWT

### Frontend
-   **Framework**: React 19 (Vite)
-   **Styling**: Tailwind CSS v4
-   **State/Routing**: React Router v7, Context API
-   **Forms**: React Hook Form + Zod

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18+)
-   MySQL Database

### backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd task-manager-backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` (see backend [README](./task-manager-backend/README.md) for details).
4.  Run migrations and start the server:
    ```bash
    npx prisma migrate dev --name init
    npm run start:dev
    ```
    Server runs on `http://localhost:3000`.

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd task-manger-frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    App runs on `http://localhost:5173`.
