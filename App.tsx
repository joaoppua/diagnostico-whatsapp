import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/pages/Dashboard';
import { MetricDocs } from './components/pages/MetricDocs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0D0D0D] text-white font-sans selection:bg-[#FF5C35]/30">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/docs/:metricId" element={<MetricDocs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;