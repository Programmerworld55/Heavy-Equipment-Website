import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(location.state?.userDetails || {});
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch("/api/order-items");
        const data = await response.json();
        setOrderItems(data.items);
        calculateTotalPrice(data.items);
      } catch (error) {
        console.error("Error fetching order items:", error);
      }
    };

    fetchOrderItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (index, delta) => {
    const newOrderItems = [...orderItems];
    const newQuantity = newOrderItems[index].quantity + delta;
    if (newQuantity > 0 && newQuantity <= newOrderItems[index].availableQuantity) {
      newOrderItems[index].quantity = newQuantity;
      setOrderItems(newOrderItems);
      calculateTotalPrice(newOrderItems);
    }
  };

  const handleQuantityInputChange = (index, event) => {
    const newOrderItems = [...orderItems];
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0 && newQuantity <= newOrderItems[index].availableQuantity) {
      newOrderItems[index].quantity = newQuantity;
      setOrderItems(newOrderItems);
      calculateTotalPrice(newOrderItems);
    }
  };

  return (
    <div className="checkout-container" >
      <div className="checkout-form">
        <div className="checkout-header">
          <h1 className="logo">Shockwave Audio</h1>
          <div className="steps">
            <span>Checkout Here</span>
          </div>
        </div>
        <form className="form">
          <div className="input-row">
            <input type="text" placeholder="Name" className="form-control" value={userDetails.name || ''} readOnly />
            <input type="email" placeholder="Email address" className="form-control" value={userDetails.email || ''} readOnly />
          </div>
          <div className="input-row">
            <input type="text" placeholder="Street address" className="form-control" value={userDetails.address?.street || ''} readOnly />
            <input type="text" placeholder="City" className="form-control" value={userDetails.address?.city || ''} readOnly />
          </div>
          <div className="input-row">
            <input type="text" placeholder="State" className="form-control" value={userDetails.address?.state || ''} readOnly />
            <input type="text" placeholder="Postal Code" className="form-control" value={userDetails.address?.postalCode || ''} readOnly />
          </div>
          <div className="input-row">
            <input type="text" placeholder="Country" className="form-control" value={userDetails.address?.country || ''} readOnly />
            <input type="text" placeholder="Contact No" className="form-control" value={userDetails.contactNo || ''} readOnly />
          </div>
          <div className="input-row">
            <input type="text" placeholder="Alternate Contact No" className="form-control" value={userDetails.alternateContactNo || ''} readOnly />
            <input type="text" placeholder="Identity Number" className="form-control" value={userDetails.identityNumber || ''} readOnly />
          </div>
          <div className="input-row">
            <input type="text" placeholder="Gender" className="form-control" value={userDetails.gender || ''} readOnly />
            <input type="date" placeholder="Date of Birth" className="form-control" value={userDetails.dateOfBirth || ''} readOnly />
          </div>
          <button className="btn btn-primary">Continue</button>
        </form>
      </div>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {orderItems.map((item, index) => (
          <div className="order-item" key={item.id}>
            <img src={item.imageUrl} alt={item.title} />
            <div>
              <p>{item.title}</p>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(event) => handleQuantityInputChange(index, event)}
                  min="1"
                  max={item.availableQuantity}
                />
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>
            </div>
            <p>${item.price.toFixed(2)}</p>
          </div>
        ))}
        <div className="totals">
          <p>+ Discount</p>
          <p>+ Giftcard</p>
          <hr />
          <div>
            <p>Subtotal</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div>
            <p>Delivery</p>
            <p>--</p>
          </div>
          <div>
            <p>Taxes</p>
            <p>--</p>
          </div>
          <div>
            <strong>Total</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
