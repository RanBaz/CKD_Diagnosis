import React, { useState, useEffect } from 'react';
import './History.css';

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await fetch('http://localhost:5000/analyses');
      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }
      const data = await response.json();
      setAnalyses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Analysis History</h2>
      <div className="max-w-4xl mx-auto">
        {analyses.map((analysis, index) => (
          <div key={analysis._id} className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Analysis #{index + 1}</h3>
            </div>
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: analysis.aiResponse }} />
            </div>
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-bold mb-2">Patient Data:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                {Object.entries(analysis.patientData).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="font-medium">{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        {analyses.length === 0 && (
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            No analyses found
          </div>
        )}
      </div>
    </div>
  );
};

export default History;