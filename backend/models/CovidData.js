const mongoose = require('mongoose');

const CovidDataSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  state: { type: String, required: true },
  cases: { type: Number, required: true },
  deaths: { type: Number, required: true }
}, { collection: 'covid_datas' });

module.exports = mongoose.model('covid_data', CovidDataSchema);
