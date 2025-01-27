import React, { useState } from "react";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Reuseable components/Navbar";
import Footer from "../Components/Reuseable components/Footer";
import WhatsAppButton from "../Components/Reuseable components/WhatsAppButton";
import ".././Styles/ContactUs.css";
// ...existing code...

const contactDetails = [
  {
    name: "Nasir Shafi Tarar (Owner/Investor)",
    phone: "971-528419198",
    email: "nasirtarar45@gmail.com",
    whatsapp: "971-528419198",
  },
  {
    name: "Ehsan Wani (Accountant)",
    phone: "971-504161346",
    email: "waniehsan85@gmail.com",
    whatsapp: "971-504161346",
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await fetch("https://your-backend-endpoint.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Your message has been sent successfully!", {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again later.", {
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="container py-5 mb-5">
          <div className="row">
            <div className="col-md-6 mb-5">
              <div className="card company-details-card h-100" style={{ overflow: "hidden", minHeight: "100vh" }}>
                <div className="card-body">
                  <h3 className="card-title subheading">Company Details</h3>
                  <div className="address">
                    <FaMapMarkerAlt className="icon" />
                    <span>Industrial Area 13, in front of ADNOC Petrol Pump, near Bin Laden Signal</span>
                  </div>
                  {contactDetails.map((contact, index) => (
                    <div key={index} className="contact-person">
                      <h5>{contact.name}</h5>
                      <p>
                        <FaPhone className="icon" /> {contact.phone}
                      </p>
                      <p>
                        <FaEnvelope className="icon" /> {contact.email}
                      </p>
                      <p>
                        <FaWhatsapp className="icon" /> {contact.whatsapp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-6 margin">
              <div className="card contact-card mb-5 margin" style={{ overflow: "visible", minHeight: "100%" }}>
                <div className="card-body margin">
                  <h3 className="text-center contact-heading">Contact Us</h3>
                  <form onSubmit={handleSubmit} className="mb-5">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        id="message"
                        name="message"
                        rows="3"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer limit={1} />
        <WhatsAppButton />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
