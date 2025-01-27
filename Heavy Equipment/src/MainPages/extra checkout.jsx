import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/CheckoutPage.css"; // Import the custom CSS for styling

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, subcategoryId, action } = location.state;
  const [quantity, setQuantity] = useState(1);
  const [subcategory, setSubcategory] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);

  useEffect(() => {
    const fetchSubcategoryDetails = async () => {
      try {
        const response = await fetch(`https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/subcategory/${subcategoryId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subcategory details");
        }
        const data = await response.json();
        setSubcategory(data);
        setStockQuantity(data.stockQuantity);
      } catch (error) {
        console.error("Error fetching subcategory details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch subcategory details. Please try again later.",
        });
      }
    };

    fetchSubcategoryDetails();
  }, [subcategoryId]);

  const handleQuantityChange = async (e) => {
    const newQuantity = e.target.value;
    try {
      const response = await fetch(`https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/check-stock?quantity=${newQuantity}`);
      const contentType = response.headers.get("content-type");
      if (!response.ok || !contentType || !contentType.includes("application/json")) {
        throw new Error("Network response was not ok or not JSON");
      }
      const data = await response.json();
      if (data.isAvailable) {
        setQuantity(newQuantity);
        setStockQuantity(data.stockQuantity);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Quantity exceeds available stock.",
        });
      }
    } catch (error) {
      console.error("Error checking stock quantity:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to check stock quantity. Please try again later.",
      });
    }
  };

  const handleConfirmOrder = () => {
    Swal.fire({
      icon: "info",
      title: "Confirmation",
      text: "Make sure you have fulfilled the transaction.",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/confirmation", { state: { userDetails, subcategory, action, quantity } });
      }
    });
  };

  if (!subcategory) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4" style={{ minHeight: "500px" }}> {/* Increase card height */}
            <div className="card-header bg-warning text-white">
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">{subcategory.name}</h5>
              <p className="card-text">{subcategory.description}</p>
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
                  <strong>Available:</strong> {subcategory.isAvailable ? "Yes" : "No"}
                </li>
              </ul>
              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={stockQuantity}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4" style={{ minHeight: "500px" }}> {/* Increase card height */}
            <div className="card-header bg-warning text-white">
              <h5 className="mb-0">Payment Details</h5>
            </div>
            <div className="card-body">
              <p>Please send the payment to the following bank account:</p>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">
                  <strong>Bank Name:</strong> XYZ Bank
                </li>
                <li className="list-group-item">
                  <strong>Account Number:</strong> 1234567890
                </li>
                <li className="list-group-item">
                  <strong>Account Name:</strong> Heavy Equipment Rentals
                </li>
                <li className="list-group-item">
                  <strong>IFSC Code:</strong> XYZB0001234
                </li>
              </ul>
              <button
                className="btn btn-primary btn-block"
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
