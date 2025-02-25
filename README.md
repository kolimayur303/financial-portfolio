# Financial Portfolio Management API

## Introduction

The Financial Portfolio Management API is designed to manage and analyze financial portfolios. It supports creating transactions, retrieving portfolio details, and viewing transaction history. The API is built using Node.js, Express, TypeScript, and MongoDB with Mongoose.

## Setup

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kolimayur303/financial-portfolio.git
   cd financial-portfolio
2. Install the dependencies:
   - npm install
3. Create a .env file in the root directory and add the following environment variables:
   - PORT=3000
   - MONGODB_URI=mongodb://localhost:27017/financial-portfolio
   - JWT_SECRET=ufwpuwhf7whfhPF8WFWUF8U38$^%*^t&
4. Start the application:
   npm run dev

5. API Documentation
   The API documentation is available on Postman.

6. Endpoints
- POST http://localhost:3000/api/users/register: Register a new user
- POST http://localhost:3000/api/users/login: Login an existing user
- POST http://localhost:3000/api/transactions: Create a new financial transaction (requires authentication)
- GET  http://localhost:3000/api/portfolio: Retrieve the current state of the user's portfolio (requires authentication)
- GET  http://localhost:3000/api/portfolio/history: Retrieve the transaction history for the user's portfolio (requires authentication)


7. Tech Stack
- Node.js: JavaScript runtime
- Express: Web framework for Node.js
- TypeScript: Typed superset of JavaScript
- MongoDB: NoSQL database
- Mongoose: ODM for MongoDB
- jsonwebtoken: For JWT-based authentication
- bcryptjs: For hashing passwords

```