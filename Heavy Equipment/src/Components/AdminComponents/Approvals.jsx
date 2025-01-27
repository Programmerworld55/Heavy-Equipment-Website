import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'; // Import icons
import { fetchUserTransactions, fetchItemDetails, updateTransactionStatus, updateItemAvailability, sendEmailNotification } from "./ApprovalsApi";

const Approvals = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUserTransactions();
      setTransactions(data.slice(0, 10)); // Simulate 10 items
    } catch (error) {
      toast.error("Error fetching transactions data.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleFetchTransactionDetails = async (transactionId, itemId) => {
    try {
      const transaction = transactions.find(t => t.id === transactionId);
      const item = await fetchItemDetails(itemId);
      setSelectedTransaction(transaction);
      setSelectedItem(item);
      setShowModal(true);
    } catch (error) {
      toast.error("Error fetching transaction details.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleApprove = async (transactionId, itemId, userId) => {
    setIsProcessing(true);
    try {
      await updateTransactionStatus(transactionId, "approved");
      await updateItemAvailability(itemId, false);
      await sendEmailNotification(userId, "Transaction Approved", "Your transaction has been approved.");
      toast.success("Transaction approved, item marked as unavailable, and email sent!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      loadTransactions(); // Refresh to show updates
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to approve transaction.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (transactionId, userId) => {
    setIsProcessing(true);
    try {
      await updateTransactionStatus(transactionId, "rejected");
      await sendEmailNotification(userId, "Transaction Rejected", "Your transaction has been rejected.");
      toast.success("Transaction rejected and email sent!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      loadTransactions(); // Refresh to show updates
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to reject transaction.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShowAlert = (type, transactionId, itemId, userId) => {
    Swal.fire({
      title: type === "approve" ? "Approve Transaction" : "Reject Transaction",
      text: `Are you sure you want to ${type} this transaction?`,
      icon: type === "approve" ? "success" : "warning",
      showCancelButton: true,
      confirmButtonText: type === "approve" ? "Approve" : "Reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "approve") {
          handleApprove(transactionId, itemId, userId);
        } else {
          handleReject(transactionId, userId);
        }
      }
    });
  };

  return (
    <div className="container mt-4" style={{ ...styles.dashboardContainer, maxWidth: "98%" }} >
      <h2 className="mb-4 text-center" style={styles.header}>Manage Approvals</h2>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover" style={styles.table}>
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th style={styles.tableHeader}><strong>User Name</strong></th>
                <th style={styles.tableHeader}><strong>Email</strong></th>
                <th style={styles.tableHeader}><strong>Product Name</strong></th>
                <th style={styles.tableHeader}><strong>Quantity</strong></th>
                <th style={styles.tableHeader}><strong>Status</strong></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td style={styles.tableCell}><strong>{transaction.name}</strong></td>
                  <td style={styles.tableCell}><strong>{transaction.email}</strong></td>
                  <td style={styles.tableCell}><strong>Product {index + 1}</strong></td>
                  <td style={styles.tableCell}><strong>{index + 1}</strong></td>
                  <td style={styles.tableCell}><strong>{transaction.status}</strong></td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleFetchTransactionDetails(transaction.id, transaction.id)}
                        style={styles.actionButton}
                      >
                        <FaEye /> View
                      </button>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleShowAlert("approve", transaction.id, transaction.id, transaction.userId)}
                        disabled={transaction.status === "approved" || isProcessing}
                        style={styles.actionButton}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleShowAlert("reject", transaction.id, null, transaction.userId)}
                        disabled={transaction.status === "rejected" || isProcessing}
                        style={styles.actionButton}
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Transaction Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {selectedTransaction && selectedItem && (
            <div>
              <p><strong>User Name:</strong> {selectedTransaction.name}</p>
              <p><strong>Email:</strong> {selectedTransaction.email}</p>
              <p><strong>Phone:</strong> {selectedTransaction.phone}</p>
              <p><strong>Address:</strong> {selectedTransaction.address}</p>
              <p><strong>Product Name:</strong> {selectedItem.title}</p>
              <p><strong>Quantity:</strong> 1</p>
              <p><strong>Amount:</strong> $1000</p>
              <p><strong>Transaction Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Payment Method:</strong> Credit Card</p>
              <p><strong>Transaction Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Delivery Address:</strong> {selectedTransaction.address}</p>
              <p><strong>Rental Period:</strong> N/A</p>
              <p><strong>Pay Slip:</strong></p>
              <img src="https://via.placeholder.com/150" alt="Pay Slip" className="img-fluid" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} style={styles.enhancedButton}>
            <FaTimes style={styles.buttonIcon} /> Close
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
    width: "98%", // Added width
  },
  header: {
    color: "#FF6F61",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
  },
  table: {
    padding: "10px",
    fontFamily: "'Roboto', sans-serif",
  },
  modalBody: {
    maxHeight: "400px",
    overflowY: "auto",
    fontFamily: "'Roboto', sans-serif",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background-color 0.3s",
  },
  enhancedButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    transition: "background-color 0.3s",
  },
  buttonIcon: {
    marginRight: "5px",
  },
  tableHeader: {
    fontSize: "1rem",
    color: "#333",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: "0.875rem",
    color: "#555",
  },
};

export default Approvals;
