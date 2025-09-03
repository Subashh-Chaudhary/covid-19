import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TotalPage from './pages/TotalPage';
import ImportData from './pages/ImportData';
import AddDataForm from './components/AddDataForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddDataForm />} />
            <Route path="/total" element={<TotalPage />} />
            <Route path="/import" element={<ImportData />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
