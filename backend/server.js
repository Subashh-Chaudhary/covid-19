require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const covidRoutes = require('./routes/covidRoutes');
const importRoutes = require('./routes/importRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/covid', covidRoutes);
app.use('/api/covid', importRoutes);

app.listen(PORT, () => {
  console.log(`✅ The COVID-19 backend server is now running and listening on port ${PORT}.`);
  console.log('🌐 Access the API endpoints at http://localhost:' + PORT + '/api/covid');
});
