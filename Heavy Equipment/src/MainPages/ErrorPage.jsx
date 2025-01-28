import React from "react";
import { Link } from "react-router-dom";
import "../Styles/../Styles/ErrorPage.css"; // Import custom CSS for styling

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">Go to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
