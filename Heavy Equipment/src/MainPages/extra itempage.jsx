import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemsPageApi from "./ItemsPageApi";
import placeholderImage from "../Assets/service1.jpeg"; // Placeholder image
import "../Styles/ItemsPage.css"; // Import the CSS file

const ItemsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mt-5">
      <ItemsPageApi setCategories={setCategories} />
      <div className="row">
        {selectedCategory ? (
          <div className="col-12">
            <h2 className="text-center text-primary">{selectedCategory.name}</h2>
            <p className="text-muted text-center">{selectedCategory.description}</p>
            <div className="row">
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={subcategory.image || placeholderImage}
                      alt={subcategory.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover", width: "100%" }}
                    />
                    <div className="card-header bg-warning text-white">
                      <h5 className="mb-0">{subcategory.name}</h5>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <p className="card-text text-muted">
                        {subcategory.description}
                      </p>
                      <ul className="list-group list-group-flush mb-3">
                        <li className="list-group-item">
                          <strong>Stock Quantity:</strong> {subcategory.stockQuantity}
                        </li>
                        <li className="list-group-item">
                          <strong>Rental Price:</strong> ${subcategory.rentalPrice}
                        </li>
                        <li className="list-group-item">
                          <strong>Buy Price:</strong> ${subcategory.buyPrice}
                        </li>
                        <li className="list-group-item">
                          <strong>Available:</strong>{" "}
                          {subcategory.isAvailable ? "Yes" : "No"}
                        </li>
                      </ul>
                      <div className="mt-auto d-flex justify-content-between">
                        <button className="btn btn-primary btn-custom flex-grow-1 me-2">Buy Now</button>
                        <button className="btn btn-secondary btn-custom flex-grow-1">Take on Rent</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn btn-floating"
              onClick={() => setSelectedCategory(null)}
            >
              <span className="arrow">&larr;</span>
              <span className="back-text">Back</span>
            </button>
          </div>
        ) : (
          categories.map((category, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-sm border-0 category-card"
                onClick={() => handleCategoryClick(category)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={category.image || placeholderImage}
                  alt={category.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
                <div className="card-body text-center d-flex flex-column">
                  <h5 className="card-title text-primary">{category.name}</h5>
                  <p className="card-text text-muted description-text">
                    {category.description}
                  </p>
                  <div className="mt-auto">
                    <button className="btn btn-outline-warning btn-custom">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ItemsPage;
