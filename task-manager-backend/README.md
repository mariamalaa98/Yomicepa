# Task Manager Backend

A production-ready RESTful API for a Task Manager application, built with **NestJS**, **Prisma** (MySQL), and **TypeScript**.

## Features

- **Authentication**: JWT-based Sign Up and Sign In.
- **Task Management**: Create, Read, Update, Delete tasks.
- **Security**: Password hashing with Bcrypt, protected routes with Guards.
- **Validation**: Strict input validation using `class-validator`.
- **Documentation**: Swagger UI integration.

## Tech Stack

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: Prisma
- **Auth**: Passport-JWT, Bcrypt

## Prerequisites

- Node.js (v18+)
- MySQL Database

## Setup Instructions

1.  **Clone the repository** (if applicable)
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Ensure you have a `.env` file with your database connection string and JWT secret:
    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    JWT_SECRET="your_super_secret_key"
    ```
4.  **Database Migration**:
    Run Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```
5.  **Run the Application**:
    ```bash
    npm run start:dev
    ```

## API Documentation

Once the server is running, visit **Swagger UI** at:
`http://localhost:3000/api`

## Testing

- **Unit Tests**:
    ```bash
    npm run test
    ```
- **API Testing**:
    Import the `postman_collection.json` file into Postman to test all endpoints.

## Project Structure

- `src/Modules/Auth`: Authentication logic (Controllers, Services, DTOs, Strategies).
- `src/Modules/Tasks`: Task management logic.
- `src/Common`: Shared services (PrismaService).
- `prisma/schema.prisma`: Database schema definition.

## Implementation Details & Decisions

- **Folder Structure**: Modular architecture (Auth, Tasks) for better scalability and separation of concerns.
- **Prisma ORM**: Chosen for its type safety and ease of use with TypeScript.
- **Validation**: Global `ValidationPipe` with whitelist enabled to prevent parameter pollution and ensure data integrity.
- **Authentication**: Usage of `Passport` and `JWT` is an industry standard for stateless authentication.
