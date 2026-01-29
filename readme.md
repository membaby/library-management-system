# Library Management System

## Overview
A simple RESTful backend API for managing books and borrow records in a library system.

## Features
- Add, update, delete and list books.
- Add, update, delete and list borrowers.
- Borrowing and returning books.

## Tech Stack

- **Runtime:** Node.js (Express)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Containerization:** Docker

## API Endpoints

The API is documented with **OpenAPI (Swagger)**.

Interactive Swagger UI in the browser (try requests, see schemas), at http://localhost:3000/api-docs

## Database & Migrations
# Library Management System

## Overview
A simple RESTful backend API for managing books and borrow records in a library system.

## Features
- Add, update, delete and list books.
- Add, update, delete and list borrowers.
- Borrowing and returning books.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Auth:** JWT
- **Testing:** Jest, Supertest
- **Containerization:** Docker


## Architecture

## API Endpoints
API documentation is available at:  
http://localhost:3000/api-docs

## Database & Migrations

The app uses **PostgreSQL** as the database and **Prisma** as the ORM. The schema is defined in `prisma/schema.prisma`, and all changes are applied via **Prisma Migrate**.



### Database Schema

Current schema (three tables):

| Model     | Fields |
|----------|---------|
| **Book** | `id`, `title`, `author`, `isbn` (unique) `shelfLocation`, `availableQuantity`, `updatedAt`. Indexes on `title` and `author`. <i>(Note: `id` and `istbn` have unique indexes)</i> |
| **Borrower** | Registered users: `id`, `name`, `email` (unique), `registeredAt`, `updatedAt`. <i>(Note: `id` and `email` have PK/unique index)</i> |
| **Borrow** | Borrow records: `id`, `bookId`, `borrowerId`, `borrowedAt`, `dueAt`, `returnedAt` (null while active). FK to `Book` and `Borrower` with `ON DELETE RESTRICT`. Indexes on `(borrowerId, returnedAt)`, `(dueAt, returnedAt)`, and `bookId`. |

Relations: `Book` ↔ `Borrow` (one-to-many), `Borrower` ↔ `Borrow` (one-to-many).

![Database Schema Diagram](/images/schema-diagram.png)

## Running Locally

### Prerequisites
- Docker and Docker Compose

1. **Clone and start services**
   ```bash
   git clone https://github.com/membaby/library-management-system
   cd library-management-system
   docker compose up --build
   ```
2. The API runs at **http://localhost:3000**. The database is available on `localhost:5432` (user `postgres`, password `postgres`, database `library`).
3. **Apply migrations** (first time or after schema changes):
   ```bash
   docker compose exec backend npx prisma migrate deploy
   ```