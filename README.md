![image_alt](https://github.com/Coachemmy/Movieers/blob/94765f862c689b4140835d8401944c82abc66324/movieers.jpg)

# Movieers

Movieers is a web application for discovering and managing your favorite movies.

## Features

- Search for movies.
- View popular movies.
- Add movies to your list.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   yarn install

## Start the development server
yarn start

.
.
.

## Database Setup

1. Install SQLite3 on your machine if it’s not already installed.
   - On macOS/Linux, it’s usually pre-installed.
   - On Windows, download it from the [SQLite website](https://sqlite.org/download.html).

2. Create the database file:
   - Run the following command in your terminal:
     ```bash
     touch movieers.db
     ```

3. Run the server:
   - The database schema will be automatically created when you start the server.
   - Start the server with:
     ```bash
     node server.js
     ```

4. Verify the database:
   - Check that the `movies` table is created by running:
     ```bash
     sqlite3 movieers.db
     .tables
     ```
