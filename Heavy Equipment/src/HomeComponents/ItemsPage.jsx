import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchMainCategories } from "./ItemsPageApi";
import placeholderImage from "../Assets/image11.jpg";
// import "../Styles/ItemsPage.css"; // Import the CSS file
import "../Styles/ItemsPage.css"; // Import the CSS file

import { FaTimes } from "react-icons/fa"; // Import close icon

const ItemsPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [arrowClicked, setArrowClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMainCategories();
        setCategories(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setLoading(false); // Set loading to false even if there is an error
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    navigate("/subcategories", { state: { category } });
  };

  const handleSubcategoryClick = (subcategory) => {
    console.log("Subcategory clicked:", subcategory);
    navigate("/profile", { state: { subcategory, subcategoryId: subcategory.id } });
  };

  const handleBackClick = () => {
    setArrowClicked(true);
    setTimeout(() => {
      setSelectedCategory(null);
      setArrowClicked(false);
    }, 1000); // Duration of the animation
  };

  const handleCloseClick = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="items-page-container">
      <div className="background-image"></div>
      <div className="content">
        <div className="row">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "200px", width: "100%" }}>
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            categories.length > 0 && categories.map((category, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div
                  className="card h-100 shadow-sm border-0 category-card"
                  style={{
                    cursor: "pointer",
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    minHeight: "400px" // Further increase card height
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
                    src={category.image || placeholderImage}
                    alt={category.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <h5 className="card-title text-primary">{category.name}</h5>
                    {/* <p className="card-text text-muted description-text">
                      {category.description}
                    </p> */}
                    <p className="card-text text-white description-text">
  {category.description}
</p>

                    <div className="mt-auto">
                      <button
                        className="btn btn-outline-warning btn-custom"
                        onClick={() => handleCategoryClick(category)}
                        style={{
                          borderRadius: "20px",
                          padding: "10px 20px",
                          transition: "background-color 0.3s, color 0.3s",
                          color: "white",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#ffc107";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "";
                          e.currentTarget.style.color = "";
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsPage;
