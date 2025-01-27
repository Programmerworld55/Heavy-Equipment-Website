import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo at the top left corner */}
        <a className="navbar-brand" href="#" style={styles.logo}>
          TAREEQ AL KHAIR
        </a>

        {/* Navbar Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Search bar in the middle */}
          <form className="d-flex mx-auto" style={styles.searchForm}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={styles.searchInput}
            />
            <button className="btn btn-warning" type="submit" style={styles.searchButton}>
              Search
            </button>
          </form>

          {/* Links on the right */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Contact Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link btn btn-signup text-dark ms-2"
                href="#"
                style={styles.signupButton}
              >
                Create Account
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  logo: {
    fontFamily: "'Brush Script MT', cursive",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
    color: "#ffc107",
  },
  searchForm: {
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    borderRadius: "20px",
    padding: "10px 20px",
    border: "2px solid #007bff",
    transition: "border-color 0.3s ease",
    width: "500px",
  },
  searchButton: {
    backgroundColor: "#ffc107",
    color: "#202020",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  signupButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    transition: "background-color 0.3s ease",
  },
};

export default Navbar;
