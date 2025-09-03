import React, { useState } from 'react';
import axios from '../api/axiosClient';

const ImportData = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
    setMessage('');
    setShowMessage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      setShowMessage(true);
      return;
    }
    setLoading(true);
    setShowMessage(false);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message || 'Import successful!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Import failed.');
    }
    setLoading(false);
    setShowMessage(true);
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: '10rem auto',
      padding: '2rem',
      border: '1px solid #eee',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      background: '#fafcff',
      fontFamily: 'Segoe UI, Arial, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', color: '#2b7a78', marginBottom: 8 }}>Import COVID-19 Data</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: 16 }}>
        Upload an Excel (.xlsx) or CSV file to import COVID-19 data into the database.
      </p>
      <ol style={{ background: '#f0f7fa', padding: '1rem', borderRadius: 8, marginBottom: 20 }}>
        <li>Click <b>Choose File</b> and select your data file.</li>
        <li>Click <b>Upload</b> to import the data.</li>
        <li>Wait for confirmation message.</li>
      </ol>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <label htmlFor="file-upload" style={{
          display: 'inline-block',
          padding: '10px 18px',
          background: '#3aafa9',
          color: '#fff',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 500,
          boxShadow: '0 2px 8px rgba(58,175,169,0.08)',
          marginBottom: 8,
          transition: 'background 0.2s',
        }}
          onMouseOver={e => e.target.style.background = '#2b7a78'}
          onMouseOut={e => e.target.style.background = '#3aafa9'}
        >
          Choose File
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
        {fileName && (
          <div style={{ color: '#17252a', fontSize: 15, marginBottom: 10, fontWeight: 500 }}>
            <span role="img" aria-label="file">📄</span> {fileName}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 28px',
            background: loading ? '#b2dfdb' : '#2b7a78',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 600,
            fontSize: 16,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px rgba(43,122,120,0.08)',
            marginTop: 8,
            transition: 'background 0.2s',
          }}
          onMouseOver={e => { if (!loading) e.target.style.background = '#3aafa9'; }}
          onMouseOut={e => { if (!loading) e.target.style.background = '#2b7a78'; }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="spinner" style={{
                width: 18,
                height: 18,
                border: '3px solid #fff',
                borderTop: '3px solid #2b7a78',
                borderRadius: '50%',
                marginRight: 8,
                animation: 'spin 1s linear infinite',
                display: 'inline-block',
              }} />
              Uploading...
            </span>
          ) : 'Upload'}
        </button>
      </form>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {showMessage && (
        <div
          style={{
            marginTop: 24,
            padding: '12px 18px',
            borderRadius: 8,
            background: message.includes('failed') ? '#ffeaea' : '#eaffea',
            color: message.includes('failed') ? '#d7263d' : '#2b7a78',
            fontWeight: 500,
            fontSize: 16,
            textAlign: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            opacity: showMessage ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default ImportData;
