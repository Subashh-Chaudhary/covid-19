
const XLSX = require('xlsx');
const path = require('path');
const mongoose = require('mongoose');
const CovidData = require('../models/CovidData');

// Load the Excel file
const filePath = path.join(__dirname, '../coviddata.xlsx');
const workbook = XLSX.readFile(filePath);

// Get the first sheet name
const sheetName = workbook.SheetNames[0];

// Convert sheet to JSON
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// MongoDB connection URI (update if needed)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/covid_db';

async function importData() {
		try {
			console.log('🚀 Starting import process...');
			await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
			console.log('✅ Successfully connected to MongoDB!');

			// Insert data into CovidData collection
			console.log(`📊 Preparing to import ${data.length} records from Excel...`);
			const result = await CovidData.insertMany(data);
			console.log(`🎉 Success! Imported ${result.length} records into the CovidData collection.`);
			console.log('🔎 Sample imported record:', result[0]);
		} catch (error) {
			console.error('❌ Error importing data:', error);
		} finally {
			await mongoose.disconnect();
			console.log('👋 Disconnected from MongoDB. Import process complete.');
		}
}

importData();