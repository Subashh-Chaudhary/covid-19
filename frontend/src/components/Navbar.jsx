import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-blue-600">
            COVID-19 Tracker
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition"
            >
              Home
            </Link>
            <Link 
              to="/add" 
              className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition"
            >
              Add Data
            </Link>
              <Link 
                to="/total" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition"
              >
                Total Data
              </Link>
              <Link 
                to="/import" 
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md transition"
              >
                Import Data
              </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
