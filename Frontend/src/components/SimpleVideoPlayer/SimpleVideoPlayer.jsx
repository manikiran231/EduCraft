import React from 'react';
import './SimpleVideoPlayer.css';

const SimpleVideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player-container">
      <video controls width="100%" height="200" preload="metadata">
        <source src={videoUrl} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
};

export default SimpleVideoPlayer;
