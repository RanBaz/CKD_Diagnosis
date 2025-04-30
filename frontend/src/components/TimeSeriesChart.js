import React from 'react';
import Plot from 'react-plotly.js';

const TimeSeriesChart = () => {
  // Simulated timestamps
  const time = ['T1', 'T2', 'T3', 'T4', 'T5'];

  // Simulated metric values
  const rf_accuracy = [0.91, 0.93, 0.95, 0.97, 1.0];
  const svm_accuracy = [0.82, 0.85, 0.87, 0.9, 0.913];

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ textAlign: 'center' }}>📈 Accuracy Over Time</h2>
      <Plot
        data={[
          {
            x: time,
            y: rf_accuracy,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'RandomForest',
            line: { color: '#8884d8' }
          },
          {
            x: time,
            y: svm_accuracy,
            type: 'scatter',
            mode: 'lines+markers',
            name: 'SVM',
            line: { color: '#82ca9d' }
          }
        ]}
        layout={{
          width: 700,
          height: 400,
          xaxis: { title: 'Training Iteration' },
          yaxis: { title: 'Accuracy', range: [0, 1.1] },
        }}
      />
    </div>
  );
};

export default TimeSeriesChart;