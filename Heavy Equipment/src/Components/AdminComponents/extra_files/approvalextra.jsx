import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { fetchApprovals, fetchUserDetails, fetchTransactionDetails, updateTransactionStatus, updateItemAvailability } from "./ApprovalsApi";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadApprovals = async () => {
      setIsLoading(true);
      try {
        const data = await fetchApprovals();
        setApprovals(data);
      } catch (error) {
        toast.error("Error fetching approvals data.", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadApprovals();
  }, []);

  const handleFetchTransactionDetails = async (transactionId) => {
    try {
      const data = await fetchTransactionDetails(transactionId);
      setSelectedTransaction(data);
      setShowModal(true);
    } catch (error) {
      toast.error("Error fetching transaction details.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleApprove = async (transactionId, itemId) => {
    try {
      await updateTransactionStatus(transactionId, "approved");
      await updateItemAvailability(itemId, false);
      toast.success("Transaction approved and item marked as unavailable!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      const data = await fetchApprovals();
      setApprovals(data);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to approve transaction.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleReject = async (transactionId) => {
    try {
      await updateTransactionStatus(transactionId, "rejected");
      toast.success("Transaction rejected successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      const data = await fetchApprovals();
      setApprovals(data);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to reject transaction.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Approvals</h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval, index) => (
                <tr key={approval.transactionId}>
                  <td>{index + 1}</td>
                  <td>{approval.userName}</td>
                  <td>{approval.email}</td>
                  <td>{approval.productName}</td>
                  <td>{approval.quantity}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => handleFetchTransactionDetails(approval.transactionId)}
                    >
                      View Details
                    </button>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleApprove(approval.transactionId, approval.itemId)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReject(approval.transactionId)}
                    >
                      Reject
                    </button>
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
        <Modal.Body>
          {selectedTransaction && (
            <div>
              <p><strong>User Name:</strong> {selectedTransaction.userName}</p>
              <p><strong>Email:</strong> {selectedTransaction.email}</p>
              <p><strong>Phone:</strong> {selectedTransaction.phone}</p>
              <p><strong>Address:</strong> {selectedTransaction.address}</p>
              <p><strong>Product Name:</strong> {selectedTransaction.productName}</p>
              <p><strong>Quantity:</strong> {selectedTransaction.quantity}</p>
              <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
              <p><strong>Transaction Status:</strong> {selectedTransaction.status}</p>
              <p><strong>Payment Method:</strong> {selectedTransaction.paymentMethod}</p>
              <p><strong>Transaction Date:</strong> {new Date(selectedTransaction.transactionDate).toLocaleDateString()}</p>
              <p><strong>Delivery Address:</strong> {selectedTransaction.deliveryAddress}</p>
              <p><strong>Rental Period:</strong> {selectedTransaction.rentalPeriod}</p>
              <p><strong>Pay Slip:</strong></p>
              <img src={selectedTransaction.paySlip} alt="Pay Slip" className="img-fluid" />
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

export default Approvals;

