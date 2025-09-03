function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">COVID-19 Tracker</h3>
            <p className="text-sm">
              Comprehensive data management system for tracking COVID-19 statistics across states.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/add" className="hover:text-blue-400 transition">Add Data</a></li>
              <li><a href="/filter" className="hover:text-blue-400 transition">Filter Data</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: info@covidtracker.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Location: New York, NY</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} COVID-19 Data Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
