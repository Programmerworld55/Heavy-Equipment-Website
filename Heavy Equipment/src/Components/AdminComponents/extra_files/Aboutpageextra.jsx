import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/AboutUs.css"; // Your custom styles
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import oneImage from "../Assets/1.jpeg"; // Import 1.jpeg
import twoImage from "../Assets/2.jpeg";
import threeImage from "../Assets/hero.jpeg";
import Carousel from 'react-bootstrap/Carousel';
import Footer from "../Components/Reuseable components/Footer";

const categories = [
  { title: "Trucks", subcategories: ["VOLVO", "MERCEDES", "MAN", "SCANIA"] },
  { title: "Bulldozers", subcategories: ["KOMATSU", "CATERPILLAR"] },
  { title: "Construction Pumps", subcategories: ["CATERPILLAR", "KOMATSU"] },
  { title: "Excavators", subcategories: ["KOMATSU", "HYUNDAI", "VOLVO", "CATERPILLAR", "DOOSAN", "HITACHI"] },
  { title: "Wheel Loaders", subcategories: ["KOMATSU", "HYUNDAI", "VOLVO", "CATERPILLAR", "DOOSAN", "HITACHI"] },
  { title: "Cranes", subcategories: ["KATO", "TADANO", "TEREX", "LIEBHERR", "ZOOMLION", "XCMG"] },
  { title: "Putzmeister Pumps", subcategories: ["PUTZMEISTER PUMP", "SCHWING PUMP", "CIFA PUMP", "XCMG", "ZOOMLION"] },
  { title: "Forklifts", subcategories: ["TOYOTA", "KOMATSU", "DOOSAN", "HYUNDAI", "CATERPILLAR", "HITACHI", "MITSUBISHI"] },
];

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

const AboutUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);

  const images = [oneImage, twoImage,threeImage, oneImage, twoImage,threeImage, oneImage, twoImage,threeImage]; // Add more images to the array

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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

  const toggleCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="hero-section text-center text-white py-5">
        <h1 className="display-4 color ">About Us</h1>
        <p className="lead color">Working through dirt and dust to deliver excellence.</p>
      </div>

      <div className="container py-5">
        {/* Company Info */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3 className="subheading">Who We Are</h3>
            <p>
              <strong>TAREEQ AL KHAIR USED HEAVY EQUIPMENTS & MACHINERY TRADING LLC</strong> is your reliable partner for high-quality heavy equipment. From excavators to cranes, we ensure top-notch machinery for diverse industries worldwide.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <Carousel>
              {images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image}
                    alt={`Slide ${index}`}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Main Categories */}
        <div className="categories-container mb-5">
          <h3 className="text-center mb-4 subheading">Our Main Categories</h3>
          <div className="row text-center">
            {(showAllCategories ? categories : categories.slice(0, 3)).map((category, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card category-card h-100">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{category.title}</h5>
                    <ul className="list-unstyled subcategories mt-auto">
                      {category.subcategories.map((sub, subIndex) => (
                        <li key={subIndex} className="subcategory-item">{sub}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={toggleCategories}>
              {showAllCategories ? "Close All" : "Show More"}
            </button>
          </div>
        </div>

        {/* Company Details and Contact Us Form */}
        <div className="row">
          <div className="col-md-6 mb-5">
            <div className="card company-details-card h-100">
              <div className="card-body">
                <h3 className="card-title subheading">Company Details</h3>
                <div className="address">
                  <FaMapMarkerAlt className="icon" />
                  <span>Industrial Area 13, in front of ADNOC Petrol Pump, near Bin Laden Signal, Sharjah, United Arab Emirates</span>
                </div>
                {contactDetails.map((contact, index) => (
                  <div key={index} className="contact-detail">
                    <p>
                      <strong>{contact.name}</strong>
                    </p>
                    <p>
                      <FaPhone className="icon" />
                       {contact.phone}
                    </p>
                    <p>
                      <FaEnvelope className="icon" />
                       <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </p>
                    <p>
                      <FaWhatsapp className="icon" />
                      {contact.whatsapp}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card contact-card mb-5">
              <div className="card-body">
                <h3 className="text-center contact-heading">Contact Us</h3>
                <form onSubmit={handleSubmit}>
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
      <a
        href="https://wa.me/971528419198"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={40} color="#fff" />
        <span>Chat with us</span>
      </a>
      <ToastContainer limit={1} />
      <Footer />
    </div>
  );
};

export default AboutUs;
