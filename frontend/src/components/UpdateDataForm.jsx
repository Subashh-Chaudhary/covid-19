import { useState } from "react";
import axiosClient from "../api/axiosClient";

function UpdateDataForm() {
  const [form, setForm] = useState({ state: "", cases: "", deaths: "", date: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' }); // Clear messages on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post("/update", form);
      setMessage({ type: 'success', text: 'Data updated successfully!' });
      setForm({ state: "", cases: "", deaths: "", date: "" });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error updating data: ' + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-green-100 p-3 rounded-full">
            <span className="text-2xl">✏️</span>
          </div>
          <h2 className="text-2xl font-bold ml-3 text-gray-800">Update COVID Record</h2>
        </div>

        {message.text && (
          <div className={`mb-4 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              name="state" 
              placeholder="Enter state name" 
              value={form.state}
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Cases</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                name="cases" 
                type="number" 
                placeholder="Number of cases" 
                value={form.cases}
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Deaths</label>
              <input 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                name="deaths" 
                type="number" 
                placeholder="Number of deaths" 
                value={form.deaths}
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              name="date" 
              type="date" 
              value={form.date}
              onChange={handleChange} 
              required 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700 transform active:scale-[0.98]'
              } 
              transition-all duration-200 flex items-center justify-center space-x-2`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <span>Update Record</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateDataForm;
