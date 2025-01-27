import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/SignupPage.css"; // Correct path for the CSS file
import VerifyEmail from "../Components/VerifyEmail";

import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.dismiss();
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 1000,
        transition: Slide,
      });
      return;
    }

    try {
      // const response = await axios.post("https://backend-api.com/signup", formData);
      const response = await axios.post("http://localhost:3000/auth/signup", formData);


      if (response.status === 201) {
        toast.dismiss();
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 5000,
          transition: Slide,
        });
        setFormData({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
      }
    } catch (err) {
      toast.dismiss();
      toast.error(err.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 1000,
        transition: Slide,
      });
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-form bg-light p-4 rounded shadow">
          <h2 className="text-center mb-2" style={{ color: "#FF6F61" }}>Welcome</h2>
          <h3 className="text-center mb-4 " style={{ color: "#FF6F61" }}>Create an Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
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
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="mb-3 position-relative">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <span
                    className="password-toggle-icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ backgroundColor: "#FF6F61", border: "none" }}
            >
              Sign Up
            </button>
            <div className="text-center mt-3">
              {/* <p>By creating an account you agree to the 
                <Link to="/terms" style={{ color: "#FF6F61" }}> General User Terms</Link> and 
                <Link to="/privacy" style={{ color: "#FF6F61" }}> User Privacy Notice</Link>.
              </p> */}
              <div className="divider-line">
                <span className="divider-text">or</span>
              </div>
              <p>Already have an account? <Link to="/login" style={{ color: "#FF6F61" }}>Log in</Link></p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
