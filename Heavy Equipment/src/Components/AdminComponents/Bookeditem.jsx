import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { fetchAvailableItems, fetchBoughtItems, fetchRentedItems, updateItemStatus } from "./BookeditemApi";
import { FaTimes } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';

const Bookeditem = () => {
  const [availableItems, setAvailableItems] = useState([]);
  const [boughtItems, setBoughtItems] = useState([]);
  const [rentedItems, setRentedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("available");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

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
    Swal.fire({
      title: 'Update Status',
      text: `Current status is ${status}. Do you want to update the status?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item.selectedSubcategory ? item.selectedSubcategory : item);
    setShowModal(true);
  };

  const handleManageClick = (item) => {
    navigate(`/ManageItems`); // Navigate to ManageUsers page with item ID
  };

  return (
    <div className="container mt-4" style={{ ...styles.dashboardContainer, maxWidth: "98%" }}>
      <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Booked Items</h2>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className={`card text-white mb-3 ${activeTab === "available" ? "bg-light" : "bg-secondary"}`} onClick={() => setActiveTab("available")} style={{ ...styles.card, ...(activeTab === "available" && styles.activeCard) }}>
            <div className="card-body" style={{ ...styles.cardText, color: "#000", fontFamily: "Verdana, sans-serif", fontSize: "1.2rem" }}>
              <h5 className="card-title" style={{ fontWeight: "bold" }}>Available Items</h5>
              <p className="card-text" style={{ color: "#000" }}>Manage all available items.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card text-white mb-3 ${activeTab === "bought" ? "bg-light" : "bg-secondary"}`} onClick={() => setActiveTab("bought")} style={{ ...styles.card, ...(activeTab === "bought" && styles.activeCard) }}>
            <div className="card-body" style={{ ...styles.cardText, color: "#000", fontFamily: "Verdana, sans-serif", fontSize: "1.2rem" }}>
              <h5 className="card-title" style={{ fontWeight: "bold" }}>Bought Items</h5>
              <p className="card-text" style={{ color: "#000" }}>Manage all bought items.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className={`card text-white mb-3 ${activeTab === "rented" ? "bg-light" : "bg-secondary"}`} onClick={() => setActiveTab("rented")} style={{ ...styles.card, ...(activeTab === "rented" && styles.activeCard) }}>
            <div className="card-body" style={{ ...styles.cardText, color: "#000", fontFamily: "Verdana, sans-serif", fontSize: "1.2rem" }}>
              <h5 className="card-title" style={{ fontWeight: "bold" }}>Rented Items</h5>
              <p className="card-text" style={{ color: "#000" }}>Manage all rented items.</p>
            </div>
          </div>
        </div>
      </div>
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
                      <th>Item</th>
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
                              onClick={() => handleViewDetails(item)}
                              style={{ ...styles.itemButton, fontSize: "1.2rem", fontWeight: "bold", color: "#0056b3" }}
                            >
                              {item.name}
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleManageClick(item)}
                              style={{ ...styles.manageButton, fontSize: "1rem", padding: "8px 12px", backgroundColor: "#0056b3", borderColor: "#004085" }}
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
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
                      item.subcategories.map((sub, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <tr>
                            <td>{index + 1}</td>
                            <td style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#155724" }}>{sub.name}</td>
                            <td style={{ fontSize: "1rem", color: "#155724" }}>{item.name}</td>
                            <td>
                              <button
                                className="btn btn-info btn-sm"
                                onClick={() => handleViewDetails({ ...item, selectedSubcategory: sub })}
                                style={{ ...styles.viewButton, fontSize: "1rem", padding: "8px 12px" }}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === "rented" && (
            <>
              <h3 className="mb-4" style={{ color: "#ffc107" }}>Rented Items</h3>
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
                    {rentedItems.map((item, index) => (
                      item.subcategories.map((sub, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <tr>
                            <td>{index + 1}</td>
                            <td style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#155724" }}>{sub.name}</td>
                            <td style={{ fontSize: "1rem", color: "#155724" }}>{item.name}</td>
                            <td>
                              <div className="d-flex">
                                <button
                                  className="btn btn-info btn-sm me-2"
                                  onClick={() => handleViewDetails({ ...item, selectedSubcategory: sub })}
                                  style={{ ...styles.viewButton, fontSize: "1rem", padding: "8px 12px" }}
                                >
                                  View Details
                                </button>
                                <button
                                  className="btn btn-secondary btn-sm"
                                  onClick={() => handleUpdateStatus(item.id, "returned")}
                                  style={{ ...styles.updateButton, fontSize: "1rem", padding: "8px 12px" }}
                                >
                                  Update Status
                                </button>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" style={styles.modal}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {selectedItem && (
            <div>
              <h5><strong>Name:</strong> {selectedItem.name}</h5>
              <p><strong>Description:</strong> {selectedItem.description}</p>
              <p><strong>Buy Price:</strong> ${selectedItem.buyPrice}</p>
              <p><strong>Rental Price:</strong> ${selectedItem.rentalPrice}</p>
              <p><strong>Stock Quantity:</strong> {selectedItem.stockQuantity}</p>
              <p><strong>Is Available:</strong> {selectedItem.isAvailable ? "Yes" : "No"}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer limit={1} />
    </div>
  );
};

const styles = {
  dashboardContainer: {
    backgroundColor: "#f4f6f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  tabButton: {
    backgroundColor: "#FF6F61",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    margin: "0 5px",
    cursor: "pointer",
  },
  itemButton: {
    color: "#007bff",
    textDecoration: "underline",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.1rem",
    background: "none",
    border: "none",
    padding: "0",
  },
  manageButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  viewButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  updateButton: {
    backgroundColor: "#6c757d",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  card: {
    maxHeight: "300px",
    overflowY: "auto",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    borderRadius: "10px",
  },
  cardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#f8f9fa", // Lighter color on hover
  },
  cardText: {
    color: "white",
  },
  scrollable: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  subcategoryItem: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  modal: {
    borderRadius: "10px",
  },
  modalBody: {
    maxHeight: "600px",
    overflowY: "auto",
  },
  itemName: {
    marginTop: "5px",
    fontSize: "0.9rem",
    color: "#555",
    textAlign: "left", // Ensure text is aligned to the left
  },
  activeCard: {
    backgroundColor: "#e3f2fd", // Active card color
  },
};

export default Bookeditem;

