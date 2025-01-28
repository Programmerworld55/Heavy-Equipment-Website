import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { CategoryContext } from "../contexts/CategoryContext";
import Swal from "sweetalert2";
import "../../Styles/ProfilePage.css"; // Import the custom CSS for styling

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const { categoryData } = useContext(CategoryContext);

  if (!userData || !categoryData) {
    console.error("User data or category data is null");
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px", width: "100%" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const { userDetails } = userData;
  const { subcategory, subcategoryId, action } = categoryData;

  console.log("ProfilePage - subcategoryId:", subcategoryId);

  const handleProceedToCheckout = () => {
    console.log("Proceeding to checkout with subcategoryId:", subcategoryId);
    setUserData({ userDetails, subcategory, subcategoryId, action });
    console.log("User data set in context:", { userDetails, subcategory, subcategoryId, action });
    navigate("/checkout");
  };

  return (
    <div className="profile-page-container">
      <div className="content">
        <h2 className="text-center text-white">Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Subcategory:</strong> {subcategory.name}</p>
          <button
            className="btn btn-primary"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;