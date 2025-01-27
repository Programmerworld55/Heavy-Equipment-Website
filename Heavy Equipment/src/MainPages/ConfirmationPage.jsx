import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../Styles/ConfirmationPage.css"; // Import the custom CSS for styling

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails, subcategory, action, quantity } = location.state;

  const totalPrice = action === "buy" ? subcategory.buyPrice * quantity : subcategory.rentalPrice * quantity;

  useEffect(() => {
    Swal.fire({
      icon: "success",
      title: "Order Confirmation",
      html: `
        <h5>Thank you for your order!</h5>
        <p>Please proceed with the payment to the provided bank account details.</p>
        <p class="text-info">Please wait for approval. We will inform you via email (${userDetails.email}) and phone number (${userDetails.contactNo}) when the transaction is approved.</p>
      `,
      confirmButtonText: "OK",
      customClass: {
        popup: 'swal-popup',
        title: 'swal-title',
        htmlContainer: 'swal-html',
        confirmButton: 'swal-confirm-button'
      }
    }).then(() => {
      navigate("/"); // Redirect to home or any other page after confirmation
    });
  }, [userDetails, navigate]);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Order Confirmation</h2>
      <div className="card mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">Order Details</h5>
        </div>
        <div className="card-body">
          <h5>{subcategory.name}</h5>
          <p>{subcategory.description}</p>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Quantity:</strong> {quantity}
            </li>
            <li className="list-group-item">
              <strong>Total Price:</strong> ${totalPrice}
            </li>
            <li className="list-group-item">
              <strong>Action:</strong> {action === "buy" ? "Buy" : "Rent"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
