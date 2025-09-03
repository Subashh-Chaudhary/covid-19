# Database Setup

## MongoDB
- The project uses MongoDB for data storage.
- Connection URI is set in `.env` as `MONGO_URI`.
- Default: `mongodb://localhost:27017/covid_db`

## Environment Variables
Example `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/covid_db
DB_HOST=localhost
DB_NAME=covid_db
```
