# How It Works

- The app uses React for UI and Axios for API requests.
- Routing is handled by `react-router-dom` (see `App.jsx`).
- Data is fetched from the backend and displayed in tables (`TotalPage.jsx`).
- Users can filter data by state and date, paginate results, and perform CRUD operations.
- Forms for adding and updating data are in `AddDataForm.jsx` and `UpdateDataForm.jsx`.
- Import functionality is available in `ImportData.jsx`.
- UI components (Navbar, Footer) are reused across pages.
- Tailwind CSS is used for styling.