import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAvailableItems, fetchBoughtItems, fetchRentedItems, updateItemStatus } from "./BookeditemApi";

const Bookeditem = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [rentedItems, setRentedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    setIsLoading(true);
    try {
      const availableData = await fetchAvailableItems();
      const boughtData = await fetchBoughtItems();
      const rentedData = await fetchRentedItems();
      setAvailableItems(availableData);
      setBoughtItems(boughtData);
      setRentedItems(rentedData);
    } catch (error) {
      toast.error("Error fetching items data.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleUpdateStatus = async (transactionId, status) => {
    try {
      await updateItemStatus(transactionId, status);
      toast.success("Item status updated successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      loadItems(); // Refresh to show updates
    } catch (error) {
      toast.error("Failed to update item status.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? null : item);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Booked Items</h2>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "available" ? "active" : ""}`}
            onClick={() => setActiveTab("available")}
          >
            Available Items
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bought" ? "active" : ""}`}
            onClick={() => setActiveTab("bought")}
          >
            Bought Items
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "rented" ? "active" : ""}`}
            onClick={() => setActiveTab("rented")}
          >
            Rented Items
          </button>
        </li>
      </ul>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {activeTab === "available" && (
            <>
              <h3 className="mb-4" style={{ color: "#007bff" }}>Available Items</h3>
              <div className="table-responsive mb-4">
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <button
                              className="btn btn-link"
                              onClick={() => handleItemClick(item)}
                            >
                              {item.name}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleItemClick(item)}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                        {selectedItem === item && (
                          <tr>
                            <td colSpan="3">
                              <div className="card mt-3">
                                <div className="card-body">
                                  <h5 className="card-title">Subcategories</h5>
                                  <ul className="list-group">
                                    {item.subcategories.map((sub, subIndex) => (
                                      <li key={subIndex} className="list-group-item">
                                        <strong>{sub.name}</strong>: {sub.description}
                                        <p className="card-text"><strong>Buy Price:</strong> ${sub.buyPrice}</p>
                                        <p className="card-text"><strong>Rent Price:</strong> ${sub.rentPrice}</p>
                                        <p className="card-text"><strong>Stock Quantity:</strong> {sub.stockQuantity}</p>
                                        <p className="card-text"><strong>Is Available:</strong> {sub.isAvailable ? "Yes" : "No"}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "bought" && (
            <>
              <h3 className="mb-4" style={{ color: "#28a745" }}>Bought Items</h3>
              <div className="table-responsive mb-4">
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boughtItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleItemClick(item)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                        {selectedItem === item && (
                          <tr>
                            <td colSpan="4">
                              <div className="card mt-3">
                                <div className="card-body">
                                  <h5 className="card-title">Item Details</h5>
                                  <p className="card-text"><strong>Category:</strong> {item.category}</p>
                                  <p className="card-text"><strong>Description:</strong> {item.description}</p>
                                  <p className="card-text"><strong>Buy Price:</strong> ${item.buyPrice}</p>
                                  <p className="card-text"><strong>Rent Price:</strong> ${item.rentPrice}</p>
                                  <p className="card-text"><strong>Stock Quantity:</strong> {item.stockQuantity}</p>
                                  <p className="card-text"><strong>Is Available:</strong> {item.isAvailable ? "Yes" : "No"}</p>
                                  <h5 className="mt-4">Subcategories</h5>
                                  <ul className="list-group">
                                    {item.subcategories.map((sub, subIndex) => (
                                      <li key={subIndex} className="list-group-item">
                                        <strong>{sub.name}</strong>: {sub.description}
                                        <p className="card-text"><strong>Buy Price:</strong> ${sub.buyPrice}</p>
                                        <p className="card-text"><strong>Rent Price:</strong> ${sub.rentPrice}</p>
                                        <p className="card-text"><strong>Stock Quantity:</strong> {sub.stockQuantity}</p>
                                        <p className="card-text"><strong>Is Available:</strong> {sub.isAvailable ? "Yes" : "No"}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "rented" && (
            <>
              <h3 className="mb-4" style={{ color: "#ffc107" }}>Rented Items</h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentedItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm me-2"
                              onClick={() => handleItemClick(item)}
                            >
                              View Details
                            </button>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleUpdateStatus(item.transactionId, "returned")}
                            >
                              Update Status
                            </button>
                          </td>
                        </tr>
                        {selectedItem === item && (
                          <tr>
                            <td colSpan="4">
                              <div className="card mt-3">
                                <div className="card-body">
                                  <h5 className="card-title">Item Details</h5>
                                  <p className="card-text"><strong>Category:</strong> {item.category}</p>
                                  <p className="card-text"><strong>Description:</strong> {item.description}</p>
                                  <p className="card-text"><strong>Buy Price:</strong> ${item.buyPrice}</p>
                                  <p className="card-text"><strong>Rent Price:</strong> ${item.rentPrice}</p>
                                  <p className="card-text"><strong>Stock Quantity:</strong> {item.stockQuantity}</p>
                                  <p className="card-text"><strong>Is Available:</strong> {item.isAvailable ? "Yes" : "No"}</p>
                                  <h5 className="mt-4">Subcategories</h5>
                                  <ul className="list-group">
                                    {item.subcategories.map((sub, subIndex) => (
                                      <li key={subIndex} className="list-group-item">
                                        <strong>{sub.name}</strong>: {sub.description}
                                        <p className="card-text"><strong>Buy Price:</strong> ${sub.buyPrice}</p>
                                        <p className="card-text"><strong>Rent Price:</strong> ${sub.rentPrice}</p>
                                        <p className="card-text"><strong>Stock Quantity:</strong> {sub.stockQuantity}</p>
                                        <p className="card-text"><strong>Is Available:</strong> {sub.isAvailable ? "Yes" : "No"}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
      <ToastContainer limit={1} />
    </div>
  );
};

export default Bookeditem;

