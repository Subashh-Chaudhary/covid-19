const express = require('express');
const multer = require('multer');
const XLSX = require('xlsx');
const CovidData = require('../models/CovidData');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/covid/import
router.post('/import', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const buffer = req.file.buffer;
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ error: 'No data found in file.' });
    }
    const result = await CovidData.insertMany(data);
    res.json({ success: true, message: `Imported ${result.length} records successfully.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
