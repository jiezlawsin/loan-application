# Loan Application API

## Features
- Loan applications (CRUD)
- PostgreSQL with Sequelize ORM
- Swagger (OpenAPI) documentation at `/swagger`
- CORS enabled for development

## Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `api` directory:
   ```env
   DB_HOST=your-db-host
   DB_NAME=your-db-name
   DB_USER=your-db-user
   DB_PASS=your-db-password
   DB_PORT=5432
   PORT=3000
   ```
3. **Run migrations:**
   ```sh
   npm run migrate
   ```

4. **(Optional) Seed demo data:**
   ```sh
   npx run seed
   ```

## Running the API

- **Development:**
  ```sh
  npm run dev
  ```
- **Unit Test:**
  ```sh
  npm run test
  ```
- **Build:**
  ```sh
  npm run build
  ```

## API Documentation

- Visit [http://localhost:3000/swagger] for Swagger API docs.

## Project Structure

- `src/` - TypeScript source code
- `src/models/` - Sequelize models
- `src/services/` - Business logic
- `src/config/` - Database config
- `migrations/` - Sequelize migrations
- `seeders/` - Sequelize seeders
