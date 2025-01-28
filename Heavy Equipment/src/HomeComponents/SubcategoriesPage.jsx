import { useLocation, useNavigate } from "react-router-dom";
import placeholderImage from "../Assets/image11.jpg"; // Placeholder image
import "../Styles/SubcategoriesPage.css"; // Import the CSS file
import Navbar from "../MainPages/Components/Navbar"; // Import Navbar component
import Footer from "../MainPages/Components/Footer"; // Import Footer component

const SubcategoriesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state;

  const handleSubcategoryClick = (subcategory) => {
    navigate("/profile", { state: { subcategory, subcategoryId: subcategory.id } });
  };

  const handleButtonClick = (subcategory, action) => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/profile", { state: { userDetails: JSON.parse(user), subcategory, subcategoryId: subcategory.id, action } });
    } else {
      navigate("/signup");
    }
  };

  const handleViewMoreDetails = (subcategory) => {
    navigate("/subcategory-detail", { state: { subcategory } });
  };

  return (
    <>
      <Navbar />
      <div className="subcategories-page-container">
        <div className="content">
          <h2 className="text-center text-white">{category.name}</h2>
          <p className="text-white text-center">{category.description}</p>
          <div className="row">
            {category.subcategories.map((subcategory, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div
                  className="card h-100 shadow-sm border-0 bg-dark text-white"
                  style={{
                    cursor: "pointer",
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    minHeight: "650px", // Increase card height
                    width: "100%" // Set card width to 100%
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <img
                    src={subcategory.image || placeholderImage}
                    alt={subcategory.name}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px",
                    }}
                  />
                  <div className="card-header bg-warning text-white">
                    <h5 className="mb-0">{subcategory.name}</h5>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <p className="card-text text-white">
                      {subcategory.description}
                    </p>
                    <ul className="list-group list-group-flush mb-3">
                      <li className="list-group-item bg-dark text-white">
                        <strong>Stock Quantity:</strong> {subcategory.stockQuantity}
                      </li>
                      <li className="list-group-item bg-dark text-white">
                        <strong>Rental Price:</strong> ${subcategory.rentalPrice}
                      </li>
                      <li className="list-group-item bg-dark text-white">
                        <strong>Buy Price:</strong> ${subcategory.buyPrice}
                      </li>
                      <li className="list-group-item bg-dark text-white">
                        <strong>Available:</strong>{" "}
                        {subcategory.isAvailable ? "Yes" : "No"}
                      </li>
                    </ul>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-primary btn-custom flex-grow-1 me-2"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(subcategory, "buy");
                        }}
                      >
                        Buy Now
                      </button>
                      <button
                        className="btn btn-secondary btn-custom flex-grow-1"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleButtonClick(subcategory, "rent");
                        }}
                      >
                        Take on Rent
                      </button>
                    </div>
                    <button
                      className="btn btn-info btn-custom mt-3"
                      style={{
                        borderRadius: "20px",
                        padding: "10px 20px",
                        transition: "background-color 0.3s, color 0.3s",
                        backgroundColor: "#17a2b8", // Set button background color
                        color: "white", // Set button text color to white
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#138496";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#17a2b8";
                        e.currentTarget.style.color = "white"; // Ensure text color remains white
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMoreDetails(subcategory);
                      }}
                    >
                      View More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SubcategoriesPage;
