import { Link } from "react-router-dom";
import heroImage from '../assets/images/covid-19.png';
import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

function Home() {
  const features = [
    {
      icon: "➕",
      title: "Data Entry",
      description: "Easily add and update COVID-19 records with our intuitive forms",
      link: "/add",
      color: "blue"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "View comprehensive statistics and analyze trends across states",
      link: "/totals",
      color: "purple"
    },
    {
      icon: "🔍",
      title: "Advanced Filtering",
      description: "Filter and search through data with custom criteria",
      link: "/filter",
      color: "indigo"
    },
    {
      icon: "📈",
      title: "Threshold Monitoring",
      description: "Track states exceeding specified case and death thresholds",
      link: "/threshold",
      color: "fuchsia"
    }
  ];

  const [total, setTotal] = useState(0);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/");
      setTotal(res.data.total);
      console.log(total);
    } catch (err) {
      setTotal(0);
      console.error("Error fetching total:", err);
    }
  };

  const stats = [
    { number: total, label: "Data Points" },
    { number: "24/7", label: "Real-time Updates" },
    { number: "100%", label: "Data Accuracy" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-36 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Comprehensive COVID-19
                <span className="block text-blue-600">Data Management System</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                A powerful platform for managing, analyzing, and visualizing COVID-19 data across all states. 
                Make informed decisions with real-time statistics and comprehensive analytics.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/add" 
                  className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition transform hover:scale-105"
                >
                  Add New Data
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt="COVID-19 Dashboard" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-48">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link} className="group">
                <div className="h-full bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300 border border-gray-100 group-hover:border-blue-100">
                  <div className={`text-3xl mb-4 bg-${feature.color}-100 w-12 h-12 rounded-lg flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About the Platform</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Our COVID-19 Data Management System provides a comprehensive solution for tracking and analyzing pandemic data across all states. 
            Built with modern technology and designed for ease of use, the platform enables efficient data management and insightful analytics.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Key Capabilities</h3>
            <ul className="text-left text-gray-600 space-y-3">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Real-time data entry and updates for all states
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Comprehensive analytics and visualization tools
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Advanced filtering and search capabilities
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Secure and reliable data management
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Begin managing your COVID-19 data with our comprehensive tools and features.
          </p>
          <Link 
            to="/add" 
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
          >
            Start Adding Data
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
