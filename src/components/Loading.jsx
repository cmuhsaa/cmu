"use client";

import "./loading.css";

const Loading = () => {
  return (
    <>
      <div className="loading-overlay">
        <div className="loader">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      </div>
    </>
  );
};

export default Loading;
