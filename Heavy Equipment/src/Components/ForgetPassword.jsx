import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      return;
    }

    setIsButtonDisabled(true); // Disable the button
    try {
      console.log(email);
      // API call to initiate password reset
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      toast.success(response.data.message || "A password reset link has been sent to your email.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });

      // Navigate to the login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      setIsButtonDisabled(false); // Re-enable the button if the request fails
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
      }}
    >
      <div
        className="p-4 shadow rounded position-relative"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-2"
          onClick={() => navigate("/login")}
        ></button>

        <h2 className="text-center mb-4" style={{ color: "#FF6F61" }}>
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="form-label">
              Enter your registered email address:
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontSize: "1.1rem", padding: "10px", backgroundColor: "#FF6F61", border: "none" }}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Processing..." : "Send Reset Link"}
          </button>
        </form>

        <p style={styles.redirectText}>
          Remembered your password?{" "}
          <span
            style={styles.redirectLink}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  redirectText: {
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#333",
  },
  redirectLink: {
    color: "#FF6F61",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default ForgotPassword;
