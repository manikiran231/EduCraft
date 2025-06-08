import React from 'react';
import './FullPageLoader.css';

const FullPageLoader = () => {
  return (
    <div className="fullpage-loader">
      <div className="loader-spinner"></div>
      <h2 className="loader-title">Loading your experience...</h2>
    </div>
  );
};

export default FullPageLoader;
