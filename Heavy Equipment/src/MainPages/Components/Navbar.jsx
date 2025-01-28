import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Navbar.css"; // Ensure the correct CSS file is imported
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand logo" to="/">
            TAREEQ AL KHAIR
          </Link>

          {/* Navbar Toggle Button for Mobile */}
          <button
            className="navbar-toggler toggleButton"
            type="button"
            onClick={handleSidebarToggle}
            aria-controls="navbarNav"
            aria-expanded={isSidebarOpen}
            aria-label="Toggle navigation"
          >
            {isSidebarOpen ? (
              <FaTimes className="toggleIcon" />
            ) : (
              <FaBars className="toggleIcon" />
            )}
          </button>

          {/* Search bar */}
          <form className="d-flex mx-auto searchForm">
            <input
              className="form-control me-2 search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-warning search-button" type="submit">
              Search
            </button>
          </form>

          {/* Links on the right */}
          <ul className="navbar-nav ms-auto d-none d-lg-flex">
            <li className={`nav-item ${location.pathname === "/Home" ? "active" : ""}`}>
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/AboutUs" ? "active" : ""}`}>
              <Link className="nav-link" to="/AboutUs">
                About
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/ContactUs" ? "active" : ""}`}>
              <Link className="nav-link" to="/ContactUs">
                Contact
              </Link>
            </li>
            <li className={`nav-item ${location.pathname === "/signup" ? "active" : ""}`}>
              <Link
                className="nav-link btn btn-signup text-dark ms-2"
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={handleSidebarToggle}>
          <FaTimes />
        </button>
        <ul className="sidebar-nav">
          <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
            <Link className="nav-link" to="/" onClick={handleSidebarToggle}>
              Home
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/about" ? "active" : ""}`}>
            <Link className="nav-link" to="/about" onClick={handleSidebarToggle}>
              About
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/contact" ? "active" : ""}`}>
            <Link className="nav-link" to="/contact" onClick={handleSidebarToggle}>
              Contact
            </Link>
          </li>
          <li className={`nav-item ${location.pathname === "/signup" ? "active" : ""}`}>
            <Link
              className="nav-link btn btn-signup text-dark ms-2"
              to="/signup"
              onClick={handleSidebarToggle}
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
