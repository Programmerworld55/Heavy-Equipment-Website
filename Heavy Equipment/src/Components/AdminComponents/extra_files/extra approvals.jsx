import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch approvals from the backend
  const fetchApprovals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/admin/approvals");
      const data = await response.json();
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

  useEffect(() => {
    fetchApprovals();
  }, []);

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/approvals/${userId}`);
      const data = await response.json();
      setSelectedUser(data);
      setShowModal(true);
    } catch (error) {
      toast.error("Error fetching user details.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  // Approve a user
  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/approvals/${userId}/approve`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("User approved successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
        fetchApprovals(); // Refresh to show updates
        setShowModal(false);
      } else {
        throw new Error("Failed to approve user.");
      }
    } catch (error) {
      toast.error("Failed to approve user.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  // Reject a user
  const handleReject = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/approvals/${userId}/reject`, {
        method: "POST",
      });

      if (response.ok) {
        toast.success("User rejected successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
        fetchApprovals(); // Refresh to show updates
        setShowModal(false);
      } else {
        throw new Error("Failed to reject user.");
      }
    } catch (error) {
      toast.error("Failed to reject user.", {
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
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval, index) => (
                <tr key={approval.id}>
                  <td>{index + 1}</td>
                  <td>{approval.name}</td>
                  <td>{approval.email}</td>
                  <td>{approval.status}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                      onClick={() => fetchUserDetails(approval.id)}
                    >
                      View Details
                    </button>
                    {approval.status === "pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleApprove(approval.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(approval.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Registered On:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <p><strong>Pay Slip:</strong></p>
              <img src={selectedUser.paySlip} alt="Pay Slip" className="img-fluid" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedUser && selectedUser.status === "pending" && (
            <>
              <Button variant="success" onClick={() => handleApprove(selectedUser.id)}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => handleReject(selectedUser.id)}>
                Reject
              </Button>
            </>
          )}
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
