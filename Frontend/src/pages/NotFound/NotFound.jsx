import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Sorry, the page you're looking for doesn't exist.</p>
      <img
        src="https://illustrations.popsy.co/gray/space.svg"
        alt="These Pages are Under Construction"
        className="notfound-image"
      />
      <button className="notfound-button" onClick={() => navigate('/')}>
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
