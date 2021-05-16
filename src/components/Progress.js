import React from 'react';

const Progress = () => (
  <div className="progress-overlay">
    <div className="spinner-border text-success progress-indicator" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Progress;