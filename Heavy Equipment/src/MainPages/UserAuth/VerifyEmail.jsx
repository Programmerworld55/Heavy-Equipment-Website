import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/signup"); // Redirect to signup if no email is found
    }
  }, [email, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        document.getElementById(`digit-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index] === "") {
        if (index > 0) {
          document.getElementById(`digit-${index - 1}`).focus();
          newCode[index - 1] = "";
        }
      } else {
        newCode[index] = "";
      }
      setCode(newCode);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      setCode(paste.split(""));
      document.getElementById("digit-5").focus();
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (code.some((digit) => digit === "")) {
      const firstEmptyIndex = code.findIndex((digit) => digit === "");
      document.getElementById(`digit-${firstEmptyIndex}`).focus();
      return;
    }

    setIsVerifying(true);
    const verificationCode = code.join("");

    try {
      const response = await axios.post("http://localhost:3000/auth/verify", {
        email,
        verificationCode,
      });

      toast.success("Verification successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("Verification failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    } finally {
      setIsVerifying(false);
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
          onClick={() => navigate("/signup")}
        ></button>

        <h2 className="text-center mb-4" style={{ color: "#FF6F61" }}>
          Verify Your Email
        </h2>

        {email ? (
          <p className="text-center mb-4">
            A verification code has been sent to <strong>{email}</strong>. Please enter it below.
          </p>
        ) : (
          <p className="text-center text-danger">No email found. Please sign up again.</p>
        )}

        <form onSubmit={handleVerification}>
          <div
            className="row g-2 justify-content-center mb-4"
            onPaste={handlePaste}
          >
            {code.map((digit, index) => (
              <div key={index} className="col-2">
                <input
                  id={`digit-${index}`}
                  type="text"
                  className="form-control text-center"
                  style={{
                    fontSize: "1.5rem",
                    border: "2px solid #ddd",
                    borderRadius: "8px",
                  }}
                  value={digit}
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontSize: "1.1rem", padding: "10px", backgroundColor: "#FF6F61", border: "none" }}
            disabled={isVerifying || code.some((digit) => digit === "")}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p style={styles.redirectText}>
          Not Registered yet?{" "}
          <span
            style={styles.redirectLink}
            onClick={() => navigate("/signup")}
          >
            Create Account
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

export default VerifyEmail;
