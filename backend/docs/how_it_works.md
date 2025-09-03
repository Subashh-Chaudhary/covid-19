# How It Works

The backend server exposes API endpoints for COVID-19 data. Data is stored in MongoDB and accessed via Mongoose models. Users can query data with filters (date range, state, deaths, cases), paginate results, and perform CRUD operations. Data can be imported from an Excel file using a utility script.

- API endpoints are defined in `routes/covidRoutes.js`.
- Data model is defined in `models/CovidData.js`.
- Database connection is managed in `db.js`.
- Server setup is in `server.js`.
- Data import utility is in `utils/importCSV.js`.
