import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Styles/CheckoutPage.css"; // Import the custom CSS for styling

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userDetails, subcategoryId, action } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [subcategory, setSubcategory] = useState(null);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subcategoryId && !userDetails) {
      navigate("/"); // Redirect to home if subcategoryId or userDetails is not available
      return;
    }

    const fetchSubcategoryDetails = async () => {
      try {
        console.log("Subcategory ID in CheckoutPage:", subcategoryId);
        console.log("User details in CheckoutPage:", userDetails);
        // const subcategoryId="1-1"
        // const response = await fetch(`https://554cb610-291f-45f2-b12e-d5800c88aff0.mock.pstmn.io/subcategory:${subcategoryId}`);
        const response = await fetch(`https://495582b2-7ace-427f-b3ee-c0018ff942af.mock.pstmn.io/subcategory:1-1`);
        
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
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryDetails();
  }, [subcategoryId, userDetails, navigate]);

  const handleQuantityChange = async (e) => {
    const newQuantity = e.target.value;
    try {
      const response = await fetch(`https://5d022ca3-6c3a-4dc9-8495-ff3dc768353e.mock.pstmn.io/check-stock?quantity=${newQuantity}`);
      if (!response.ok) {
        throw new Error("Failed to check stock quantity");
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px", width: "100%" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!subcategory) {
    console.error("Subcategory data is null");
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "200px", width: "100%" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "98%" }}>
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
              <ul className="list-group list-group-flush mb-3 text-white">
                <li className="list-group-item text-white">
                  <strong>Stock Quantity:</strong> {subcategory.stockQuantity}
                </li>
                <li className="list-group-item text-white">
                  <strong>Rental Price:</strong> ${subcategory.rentalPrice}
                </li>
                <li className="list-group-item text-white">
                  <strong>Buy Price:</strong> ${subcategory.buyPrice}
                </li>
                <li className="list-group-item text-white">
                  <strong>Available:</strong> {subcategory.isAvailable ? "Yes" : "No"}
                </li>
              </ul>
              <div className="form-group text-white">
                <label className="text-white">Quantity</label>
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
            <div className="card-body text-white">
              <p>Please send the payment to the following bank account:</p>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item text-white">
                  <strong>Bank Name:</strong> XYZ Bank
                </li>
                <li className="list-group-item text-white">
                  <strong>Account Number:</strong> 1234567890
                </li>
                <li className="list-group-item text-white">
                  <strong>Account Name:</strong> Heavy Equipment Rentals
                </li>
                <li className="list-group-item text-white">
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
