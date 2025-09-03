# Server Setup

- The server is set up in `server.js`.
- Loads environment variables from `.env`.
- Connects to MongoDB using `db.js`.
- Sets up Express app with CORS and body-parser.
- Mounts COVID API routes at `/api/covid`.
- Listens on port defined in `.env` (default 5000).
