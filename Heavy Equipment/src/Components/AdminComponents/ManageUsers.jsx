import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchUsers, deleteUser } from "./ManageUsersApi";
import { FaEye, FaTrashAlt } from 'react-icons/fa'; // Update delete icon
import ErrorBoundary from "./ErrorBoundary";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        toast.error("Error fetching users data", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      }
    };

    loadUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(userIdToDelete);
      setUsers(users.filter((user) => user._id !== userIdToDelete));
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      setShowConfirmModal(false);
    } catch (error) {
      toast.error("Failed to delete user.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      setShowConfirmModal(false);
    }
  };

  const handleShowConfirmModal = (userId) => {
    setUserIdToDelete(userId);
    setShowConfirmModal(true);
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <ErrorBoundary>
      <div className="container mt-4" style={{ ...styles.dashboardContainer, maxWidth: '95%' }}>
        <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Users</h2>
        <div className="table-responsive mb-4">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td><strong>{index + 1}</strong></td>
                    <td><strong>{user.name}</strong></td>
                    <td><strong>{user.email}</strong></td>
                    <td>
                      <div style={styles.actionButtons}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleViewDetails(user)}
                          style={styles.viewButton}
                        >
                          <FaEye /> View Details
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleShowConfirmModal(user._id)}
                          style={styles.deleteButton}
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div style={styles.userDetails}>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <p><strong>Address:</strong> {selectedUser.address}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
                <p><strong>Registered On:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} style={styles.closeButton}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} style={styles.confirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.confirmModalBody}>
            Are you sure you want to delete this user?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowConfirmModal(false)} style={styles.cancelButton}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} style={styles.deleteConfirmButton}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer limit={1} />
      </div>
    </ErrorBoundary>
  );
};

const styles = {
  dashboardContainer: {
    backgroundColor: "#f4f6f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  actionButtons: {
    display: "flex",
    gap: "10px",
  },
  viewButton: {
    backgroundColor: "#6c757d", // Professional secondary color
    border: "none",
    color: "#fff",
    padding: "3px 8px", // Reduced padding
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.875rem", // Reduced font size
  },
  deleteButton: {
    backgroundColor: "#dc3545", // Professional danger color
    border: "none",
    color: "#fff",
    padding: "3px 8px", // Reduced padding
    borderRadius: "5px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.875rem", // Reduced font size
  },
  card: {
    maxHeight: "300px",
    overflowY: "auto",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  scrollable: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  closeButton: {
    backgroundColor: "#6c757d", // Professional secondary color
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  userDetails: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    lineHeight: "1.6",
  },
  confirmModal: {
    borderRadius: "10px",
  },
  confirmModalBody: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteConfirmButton: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ManageUsers;
