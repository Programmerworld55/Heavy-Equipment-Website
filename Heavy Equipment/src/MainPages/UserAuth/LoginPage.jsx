import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import "../../Styles/SignupPage.css"; // Correct path for the CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false); // New state for button disabling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setButtonDisabled(true); // Disable button while request is processing

    try {
      const response = await axios.post("https://your-backend-api.com/forgot-password", { email: forgotEmail });
      if (response.status === 200) {
        toast.dismiss();
        toast.success("Password reset email sent!", {
          position: "top-right",
          autoClose: 5000,
          transition: Slide,
        });
        setForgotEmail("");
        setShowForgotPasswordForm(false); // Close the form
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Error sending reset email!", {
        position: "top-right",
        autoClose: 1000,
        transition: Slide,
      });
    } finally {
      setButtonDisabled(false); // Re-enable the button after request completes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password.length < 8) {
      toast.dismiss();
      toast.error("Password must be at least 8 characters long!", {
        position: "top-right",
        autoClose: 1000,
        transition: Slide,
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", formData);

      if (response.status === 200) {
        const { token, role, user } = response.data;

        // Set token, role, and user in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(user));

        toast.dismiss();
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 5000,
          transition: Slide,
        });

        // Redirect or perform any additional actions
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Invalid credentials!", {
        position: "top-right",
        autoClose: 1000,
        transition: Slide,
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Forgot Password Form */}
        {showForgotPasswordForm && (
          <div className="forgot-password-form bg-light p-4 rounded shadow">
            <FaTimes
              className="close-icon"
              onClick={() => setShowForgotPasswordForm(false)}
              style={{ cursor: "pointer", fontSize: "1.5rem", position: "absolute", top: "10px", right: "15px" }}
            />
            <h3 className="text-center mb-4" style={{ color: "#FF6F61" }}>Forgot Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label htmlFor="forgotEmail" className="form-label">Enter your email</label>
                <input
                  type="email"
                  className="form-control"
                  id="forgotEmail"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: "#FF6F61", border: "none" }}
                disabled={buttonDisabled} // Disable button when loading
              >
                {buttonDisabled ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        )}

        {/* Login Form */}
        {!showForgotPasswordForm && (
          <div className="signup-form bg-light p-4 rounded shadow">
            <h2 className="text-center mb-2" style={{ color: "#FF6F61" }}>Welcome Back</h2>
            <h3 className="text-center mb-4" style={{ color: "#FF6F61" }}>Log In</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: "#FF6F61", border: "none" }}
              >
                Log In
              </button>
              <div className="text-center mt-3">
                <p
                  className="text-link"
                  onClick={() => setShowForgotPasswordForm(true)}
                  style={{ cursor: "pointer", color: "#FF6F61" }}
                >
                  Forgot Password?
                </p>
                <div className="divider-line">
                  <span className="divider-text">or</span>
                </div>
                <p>Don't have an account? <Link to="/signup" style={{ color: "#FF6F61" }}>Sign Up</Link></p>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
