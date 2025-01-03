# Readers Sanctuary

Readers Sanctuary is a book note application where users can share their thoughts about books. It allows users to add, update, and review books, as well as maintain their personal profile and interact with others.

## Features

- User authentication with Passport.js (Local and Google OAuth).
- Book search and addition via an external API.
- Personal book collection with reviews and ratings.
- Public profiles to showcase favorite books and genres.
- Tailwind CSS for responsive design.
- Secure user sessions with express-session and Sequelize.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/readers_sanctuary.git
   cd readers_sanctuary
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following variables:
   ```env
   API_URI=<your_external_api_endpoint>
   API_COVER=<your_book_cover_api_endpoint>
   DATABASE_URL=<your_postgresql_database_url>
   SESSION_SECRET=<your_session_secret>
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your_google_client_secret>
   ```

4. Set up the database:
   - Ensure PostgreSQL is running.
   - Run migrations (if applicable) to initialize the database schema.

5. Build the Tailwind CSS:
   ```bash
   npm run css
   ```

## Usage

### Development Server
To start the development server with live reloading:
```bash
npm run dev
```

### Production Server
To start the production server:
```bash
npm start
```

### CSS Compilation
Tailwind CSS files are watched and compiled using:
```bash
npm run css
```

## Scripts

- `start`: Starts the application in production mode.
- `dev`: Starts the application with `nodemon` for development.
- `css`: Watches and compiles Tailwind CSS.

## Built With

- **Node.js** - Backend runtime environment.
- **Express.js** - Web framework for Node.js.
- **Passport.js** - User authentication.
- **Sequelize** - ORM for PostgreSQL.
- **Tailwind CSS** - Utility-first CSS framework.

## Folder Structure

```
readers_sanctuary/
├── public/
│   ├── css/
│   │   ├── input.css
│   │   └── style.css
│   └── js/
├── views/
│   ├── partials/
│   ├── pages/
├── models/
├── controllers/
├── routes/
├── .env
├── app.js
└── package.json
```

## License

This project is licensed under the ISC License.

## Author

**Dipesh Sapkota**

Feel free to contribute or provide feedback!

