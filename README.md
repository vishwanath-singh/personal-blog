# Blog API Overview

The Blog API is a RESTful service for managing blog posts and users. It provides endpoints to create, read, update, and delete blog posts, and manage users.

## Features

- Create a Blog Post: Endpoint to create new blog posts.
- Get Blog Posts: Retrieve a list of blog posts or a specific post by ID.
- Update a Blog Post: Modify the details of an existing blog post.
- Delete a Blog Post: Remove a blog post by ID.
- User Management: Manage user details associated with blog posts.

## Technologies Used

- Node.js: Server-side JavaScript runtime.
- Express: Web framework for Node.js.
- Sequelize: ORM for PostgreSQL.
- PostgreSQL: Relational database management system.
- TypeScript: Superset of JavaScript for type safety.
- Jest: Testing framework.
- Supertest: HTTP assertions for testing.


## Installation

1. Clone the Repository
 ```
 git clone https://github.com/vishwanath-singh/personal-blog/
 cd personal-blog
 ```
2. Install Dependencies
 ```
 npm install
 ```
3. Configure Environment Variables
 Create a .env file in the root directory of the project and add the following variables:
 ```
 PORT=3000
 DB_HOST=localhost
 DB_PORT=5432
 DB_USER=your-db-username
 DB_PASSWORD=your-db-password
 DB_NAME=your-db-name
 NODE_ENV=development
 ```
4. Run Database Migrations
 ```
 npx sequelize-cli db:migrate
 ```
5. Start the Server
 ```
 npm start
 ```

## Testing
To run tests, use:
```
npm test
```
   






