# API Routes Documentation

## GET /api/covid
- Returns paginated COVID-19 data.
- Supports filters: `state`, `startDate`, `endDate`.
- Returns 404 if no records found for filters.

## POST /api/covid/add
- Adds a new COVID-19 record.
- Requires: `date`, `state`, `cases`, `deaths`.

## PUT /api/covid/update/:id
- Updates an existing record by ID.

## DELETE /api/covid/delete/:id
- Deletes a record by ID.

