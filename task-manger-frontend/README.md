# Task Manager Frontend

A modern React + TypeScript frontend for the Task Manager application, built with Vite and Tailwind CSS v4.

## Features

- **Authentication**: Sign up and sign in with form validation
- **Task Dashboard**: Create, read, update, delete tasks
- **Protected Routes**: JWT-based authentication
- **Modern UI**: Dark mode design with Tailwind CSS

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Prerequisites

- Node.js (v18+)
- Backend server running on `http://localhost:3000`

## Setup Instructions

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start development server**:
    ```bash
    npm run dev
    ```
   The app will run at `http://localhost:5173`.

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── api/           # Axios instance with interceptors
├── components/    # Reusable UI components
│   └── ui/        # Button, Input
├── context/       # AuthContext for state management
├── pages/
│   ├── Auth/      # Signup, Signin pages
│   └── Dashboard/ # Dashboard, TaskForm
└── lib/           # Utility functions
```

## Features Implemented

### Authentication
- **Sign Up** (`/signup`): Email, full name, password with strict validation
- **Sign In** (`/signin`): Email and password login
- **Protected Routes**: Automatic redirect to signin if not authenticated

### Dashboard
- **Welcome Message**: Displays user's full name
- **Task List**: View all tasks with completion status
- **Create Task**: Add new tasks with title and description
- **Edit Task**: Update existing tasks
- **Delete Task**: Remove tasks with confirmation
- **Toggle Complete**: Mark tasks as complete/incomplete
- **Logout**: Clear session and return to signin

## Password Validation

- Minimum 8 characters
- At least one letter
- At least one number
- At least one special character

## Notes

- The frontend expects the backend API to be running on `http://localhost:3000`.
- JWT tokens are stored in `localStorage`.
- Tailwind CSS v4 is used with CSS-based configuration.
