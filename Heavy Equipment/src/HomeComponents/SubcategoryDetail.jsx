import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/subcategory-detail.css"; // Import the CSS file
import image1 from "../Assets/image11.jpg";
import image2 from "../Assets/image22.jpg";
import Navbar from "../MainPages/Components/Navbar"; // Import Navbar component
import Footer from "../MainPages/Components/Footer"; // Import Footer component

const SubcategoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subcategory } = location.state;

  // Use images from the assets folder
  const images = [image1, image2, image1, image2];
//   const images = [image1];


  const handleButtonClick = (subcategory, action) => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/profile", { state: { userDetails: JSON.parse(user), subcategory, subcategoryId: subcategory.id, action } });
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <Navbar />
      <div className="subcategory-detail-page-container">
        <div className="content">
          <div className="row">
            <div className="col-md-6">
              <div className="card bg-dark text-white p-4" style={{ minHeight: "700px" }}>
                <h2 className="text-warning">{subcategory.name}</h2>
                <p className="subcategory-description styled-description">{subcategory.description}</p>
                <div className="details-grid">
                  <div className="detail-item">
                    <strong>Stock Quantity:</strong> <span className="detail-value">{subcategory.stockQuantity}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Rental Price:</strong> <span className="detail-value">${subcategory.rentalPrice}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Buy Price:</strong> <span className="detail-value">${subcategory.buyPrice}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Brand:</strong> <span className="detail-value">{subcategory.brand}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Model:</strong> <span className="detail-value">{subcategory.model}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Manufacturing Year:</strong> <span className="detail-value">{subcategory.manufacturingYear}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Usages:</strong> <span className="detail-value">{subcategory.usages}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Origin:</strong> <span className="detail-value">{subcategory.origin}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Available:</strong> <span className="detail-value">{subcategory.isAvailable ? "Yes" : "No"}</span>
                  </div>
                </div>
                <div className="d-flex flex-column mt-3">
                  <button
                    className="btn btn-primary btn-custom mb-2"
                    style={{
                      borderRadius: "20px",
                      padding: "10px 20px",
                      transition: "background-color 0.3s, color 0.3s",
                      backgroundColor: "#007bff", // Set button background color
                      color: "white", // Set button text color to white
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#0056b3";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#007bff";
                      e.currentTarget.style.color = "white"; // Ensure text color remains white
                    }}
                    onClick={() => handleButtonClick(subcategory, "buy")}
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-secondary btn-custom"
                    style={{
                      borderRadius: "20px",
                      padding: "10px 20px",
                      transition: "background-color 0.3s, color 0.3s",
                      backgroundColor: "#6c757d", // Set button background color
                      color: "white", // Set button text color to white
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#5a6268";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#6c757d";
                      e.currentTarget.style.color = "white"; // Ensure text color remains white
                    }}
                    onClick={() => handleButtonClick(subcategory, "rent")}
                  >
                    Take on Rent
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image-gallery">
                {images.length === 1 ? (
                  <img
                    src={images[0]}
                    alt={`${subcategory.name} 1`}
                    className="img-fluid mb-3 gallery-image full-width-image"
                  />
                ) : (
                  images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${subcategory.name} ${index + 1}`}
                      className="img-fluid mb-3 gallery-image"
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubcategoryDetail;
