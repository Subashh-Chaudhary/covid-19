const express = require('express');
const router = express.Router();
const CovidData = require('../models/CovidData'); // This exports the model for 'covid_datas' collection
const covid_data = CovidData; // Use 'covid_data' as the model name for clarity



// GET /api/covid/ (paginated)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const filter = {};
    if (req.query.startDate || req.query.endDate) {
      filter.date = {};
      if (req.query.startDate) filter.date.$gte = req.query.startDate;
      if (req.query.endDate) filter.date.$lte = req.query.endDate;
    }
    if (req.query.state) {
      filter.state = req.query.state;
    }

    const total = await covid_data.countDocuments(filter);
    const data = await covid_data.find(filter).sort({ _id: -1 }).skip(skip).limit(limit);
    if (data.length === 0) {
      return res.status(404).json({
        message: 'No records found for the given filters.'
      });
    }
    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/covid/add
router.post('/add', async (req, res) => {
  try {
    const { date, state, cases, deaths } = req.body;
    const covidRecord = new covid_data({ date, state, cases, deaths });
    await covidRecord.save();
    res.status(201).json({
      success: true,
      message: 'Covid data added successfully.',
      data: covidRecord
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to add covid data.',
      error: err.message
    });
  }
});

// PUT /api/covid/update/:id
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { state, cases, deaths, date } = req.body;
    const updated = await covid_data.findByIdAndUpdate(
      id,
      { $set: { state, cases, deaths, date } },
      { new: true }
    );
    if (updated) {
      res.json({
        success: true,
        message: 'Covid data updated successfully.',
        data: updated
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Covid data not found for the given id.'
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to update covid data.',
      error: err.message
    });
  }
});


// DELETE /api/covid/delete/:id
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'No id provided for deletion.'
      });
    }
    const result = await CovidData.findByIdAndDelete(id);
    if (result) {
      res.json({
        success: true,
        message: 'Covid data deleted successfully.',
        result
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No record found for the provided id.'
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete covid data.',
      error: err.message
    });
  }
});


module.exports = router;
