import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import ModelComparison from './components/ModelComparison';
import AdvancedChart3D from './components/AdvancedChart3D';
import GaugeCharts from './components/GaugeCharts';
import AnalysisExplanation from './components/AnalysisExplanation';
import Prediction from './pages/Prediction';
import History from './pages/History';

function Dashboard() {
  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '30px' }}>
        Chronic Kidney Disease Analysis Dashboard
      </h1>

      <div className="component-container fade-in">
        <AnalysisExplanation />
      </div>

      <div className="component-container fade-in" style={{ animationDelay: '0.2s' }}>
        <ModelComparison />
      </div>

      <div className="component-container fade-in" style={{ animationDelay: '0.4s' }}>
        <GaugeCharts /> 
      </div>

      <div className="component-container fade-in" style={{ animationDelay: '0.6s' }}>
        <AdvancedChart3D />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict" element={<Prediction />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;