import React, { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

function TotalPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ state: "", startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ state: "", cases: "", deaths: "", date: "" });
  const [popup, setPopup] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [page, limit, filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...(filters.state && { state: filters.state }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate })
      };
      const res = await axiosClient.get("/", { params });
      setData(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      setData([]);
      setTotalPages(1);
      setTotal(0);
    }
    setLoading(false);
    setTimeout(() => {
      setShowPopup(false);
      setPopup("");
    }, 1200); // Hide popup after loading
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ state: "", startDate: "", endDate: "" });
    setPage(1);
  };

  const handleEdit = (row) => {
    setEditId(row._id);
    setEditForm({ state: row.state, cases: row.cases, deaths: row.deaths, date: row.date.slice(0, 10) });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/update/${editId}`, editForm);
      setEditId(null);
      fetchData();
    } catch (err) {
      alert("Failed to update record.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axiosClient.delete(`/delete/${id}`);
      fetchData();
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 pt-20">
      {/* Interactive Popup message */}
      {popup && showPopup && (
        <div style={{
          position: 'fixed',
          top: 32,
          right: 32,
          background: 'linear-gradient(90deg,#7c3aed 80%,#a78bfa 100%)',
          color: '#fff',
          padding: '16px 40px 16px 24px',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(124,58,237,0.18)',
          fontWeight: 600,
          fontSize: 18,
          zIndex: 9999,
          minWidth: 220,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          opacity: showPopup ? 1 : 0,
          transition: 'opacity 0.4s, transform 0.4s',
          transform: showPopup ? 'translateY(0)' : 'translateY(-20px)',
        }}>
          <span style={{ flex: 1 }}>{popup}</span>
          <button
            onClick={() => { setShowPopup(false); setPopup(""); }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 22,
              cursor: 'pointer',
              fontWeight: 700,
              marginLeft: 8,
              lineHeight: 1,
              transition: 'color 0.2s',
            }}
            aria-label="Close popup"
            title="Close"
            onMouseOver={e => e.target.style.color = '#fbbf24'}
            onMouseOut={e => e.target.style.color = '#fff'}
          >×</button>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-700 ">Total COVID Data</h1>
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-end items-center">
          {/* ...existing code... */}
          <label className="flex flex-col text-right">
            <span className="text-sm font-medium mb-1">Find by State</span>
            <input
              type="text"
              name="state"
              placeholder="State name"
              value={filters.state}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>
          <label className="flex flex-col text-right">
            <span className="text-sm font-medium mb-1">Start Date</span>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>
          <label className="flex flex-col text-right">
            <span className="text-sm font-medium mb-1">End Date</span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </label>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 text-md py-2 rounded bg-red-400 hover:bg-red-500 text-white shadow transition-colors"
            style={{ alignSelf: 'flex-end', marginLeft: 8 }}
          >
            Clear Filters
          </button>
        </div>
        {/* Table */}
        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></span>
              <span className="ml-4 text-lg text-purple-600">Loading...</span>
            </div>
          ) : (
            <>
              {/* ...existing code... */}
              <table className="min-w-full border-separate border-spacing-y-2">
                {/* ...existing code... */}
                <thead className="bg-purple-100">
                  <tr>
                    <th className="p-3 text-left font-semibold text-purple-700">State</th>
                    <th className="p-3 text-left font-semibold text-purple-700">Cases</th>
                    <th className="p-3 text-left font-semibold text-purple-700">Deaths</th>
                    <th className="p-3 text-left font-semibold text-purple-700">Date</th>
                    <th className="p-3 text-left font-semibold text-purple-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ...existing code... */}
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500">No data found.</td>
                    </tr>
                  ) : (
                    data.map((row) => (
                      <tr key={row._id} className="border-t hover:bg-purple-50 transition-all">
                        {/* ...existing code... */}
                        {editId === row._id ? (
                          <>
                            {/* ...existing code... */}
                            <td className="p-3">
                              <input
                                type="text"
                                name="state"
                                value={editForm.state}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                name="cases"
                                value={editForm.cases}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="number"
                                name="deaths"
                                value={editForm.deaths}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                              />
                            </td>
                            <td className="p-3">
                              <input
                                type="date"
                                name="date"
                                value={editForm.date}
                                onChange={handleEditChange}
                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                              />
                            </td>
                            <td className="p-3 flex gap-2">
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow"
                                onClick={handleEditSubmit}
                              >
                                Save
                              </button>
                              <button
                                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded shadow"
                                onClick={() => setEditId(null)}
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            {/* ...existing code... */}
                            <td className="p-3 cursor-pointer" title="Click to edit" onClick={() => handleEdit(row)}>{row.state}</td>
                            <td className="p-3">{row.cases.toLocaleString()}</td>
                            <td className="p-3">{row.deaths.toLocaleString()}</td>
                            <td className="p-3">{
                              (() => {
                                const parsed = new Date(row.date);
                                return isNaN(parsed.getTime())
                                  ? row.date
                                  : parsed.toLocaleDateString();
                              })()
                            }</td>
                            <td className="p-3 flex gap-2">
                              <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                                onClick={() => handleDelete(row._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                <span className="text-gray-500 font-medium">
                  Page {page} of {totalPages} | Total Records: {total}
                </span>
                <div className="flex gap-2 items-center">
                  <button
                    className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300 text-purple-700 font-semibold shadow"
                    disabled={page === 1}
                    onClick={() => {
                      setPopup('Loading previous page...');
                      setShowPopup(true);
                      setPage(page - 1);
                    }}
                  >
                    Prev
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-purple-200 hover:bg-purple-300 text-purple-700 font-semibold shadow"
                    disabled={page === totalPages}
                    onClick={() => {
                      setPopup('Loading next page...');
                      setShowPopup(true);
                      setPage(page + 1);
                    }}
                  >
                    Next
                  </button>
                  <select
                    value={limit}
                    onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {[10, 20, 50, 100].map(n => (
                      <option key={n} value={n}>{n} / page</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TotalPage;
