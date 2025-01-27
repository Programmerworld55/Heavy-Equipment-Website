import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMainCategories, saveCategory, deleteCategory, saveSubcategory, updateCategory, updateSubcategory, deleteSubcategory } from "./ManageItemsApi";
import { FaTimes } from 'react-icons/fa';
import ErrorBoundary from "./ErrorBoundary";

const ManageItems = () => {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [newSubcategory, setNewSubcategory] = useState({
    name: "",
    description: "",
    image: null,
    stockQuantity: "",
    isAvailable: false,
  });
  const [expandedSubcategories, setExpandedSubcategories] = useState({});

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchMainCategories();
        setMainCategories(data);
      } catch (error) {
        toast.error("Error fetching categories", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubcategoryInputChange = (e) => {
    const { name, value, files } = e.target;
    setNewSubcategory((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateCategoryForm = () => {
    const { name, description } = newCategory;
    if (!name || !description) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      return false;
    }
    return true;
  };

  const validateSubcategoryForm = () => {
    const { name, description, stockQuantity } = newSubcategory;
    if (!name || !description || !stockQuantity) {
      toast.error("Please fill in all required fields.", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      return false;
    }
    return true;
  };

  const handleSaveCategory = async () => {
    if (!validateCategoryForm()) return;

    try {
      if (modalType === "add") {
        await saveCategory(newCategory, true);
        toast.success("Category added successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        await updateCategory(newCategory, selectedCategory.id);
        toast.success("Category updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      }
      setShowModal(false);
      setSelectedCategory(null);
      const data = await fetchMainCategories();
      setMainCategories(data);
    } catch (error) {
      toast.error("Failed to save category", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      setMainCategories(mainCategories.filter((cat) => cat.id !== id));
    } catch (error) {
      toast.error("Failed to delete category", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleSaveSubcategory = async () => {
    if (!validateSubcategoryForm()) return;

    try {
      if (modalType === "addSubcategory") {
        await saveSubcategory(newSubcategory, selectedCategory.id);
        toast.success("Subcategory added successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      } else {
        await updateSubcategory(newSubcategory, selectedCategory.id, newSubcategory.id);
        toast.success("Subcategory updated successfully!", {
          position: "top-right",
          autoClose: 2000,
          transition: Slide,
        });
      }
      setShowModal(false);
      const data = await fetchMainCategories();
      setMainCategories(data);
    } catch (error) {
      toast.error("Failed to save subcategory", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    try {
      await deleteSubcategory(categoryId, subcategoryId);
      toast.success("Subcategory deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
      const data = await fetchMainCategories();
      setMainCategories(data);
    } catch (error) {
      toast.error("Failed to delete subcategory", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
      });
    }
  };

  const handleOpenModal = (type, category = null, subcategory = null) => {
    setModalType(type);
    setSelectedCategory(category);
    if (type === "addSubcategory") {
      setNewSubcategory({ name: "", description: "", image: null, stockQuantity: "", isAvailable: false });
    } else if (type === "updateSubcategory") {
      setNewSubcategory(subcategory);
    } else {
      setNewCategory(
        category
          ? {
              name: category.name,
              description: category.description,
              image: null,
            }
          : { name: "", description: "", image: null }
      );
    }
    setShowModal(true);
  };

  const handleViewDetails = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleToggleSubcategoryDetails = (subcategoryId) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }));
  };

  return (
    <ErrorBoundary>
      <div className="container mt-4" style={styles.dashboardContainer}>
        <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Items</h2>
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => handleOpenModal("add")}
          style={styles.addButton}
        >
          Add Main Category
        </Button>

        <div className="table-responsive mb-4">
          <table className="table table-striped table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mainCategories.map((category, index) => (
                <React.Fragment key={category.id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        className="btn btn-link"
                        onClick={() => handleViewDetails(category)}
                        style={styles.categoryNameButton}
                      >
                        {category.name}
                      </button>
                    </td>
                    <td>{category.description}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => handleViewDetails(category)}
                        style={styles.viewButton}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleOpenModal("update", category)}
                        style={styles.updateButton}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {selectedCategory === category && (
                    <tr>
                      <td colSpan="4">
                        <div className="card mt-3" style={styles.card}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title">Subcategories</h5>
                              <FaTimes
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedCategory(null)}
                              />
                            </div>
                            <div style={styles.scrollable}>
                              <p><strong>Total Subcategories:</strong> {category.subcategories.length}</p>
                              <ul className="list-group">
                                {category.subcategories.map((sub, subIndex) => (
                                  <li key={subIndex} className="list-group-item" style={styles.subcategoryItem}>
                                    <strong>{sub.name}</strong>
                                    <button
                                      className="btn btn-link"
                                      onClick={() => handleToggleSubcategoryDetails(sub.id)}
                                      style={{
                                        color: "#FF6F61", // Theme color
                                        textDecoration: "none", // Remove underline
                                        fontWeight: "bold", // Bold text
                                        padding: "5px 10px", // Add padding
                                        border: "1px solid transparent", // Default transparent border
                                        borderRadius: "5px", // Rounded corners
                                        backgroundColor: "transparent", // Transparent background
                                        cursor: "pointer", // Pointer cursor on hover
                                        transition: "all 0.3s ease-in-out", // Smooth transition for hover effects
                                      }}
                                    >
                                      {expandedSubcategories[sub.id] ? "Hide Details" : "View Details"}
                                    </button>
                                    {expandedSubcategories[sub.id] && (
                                      <>
                                        <p className="card-text"><strong>Description:</strong> {sub.description}</p>
                                        <p className="card-text"><strong>Stock Quantity:</strong> {sub.stockQuantity}</p>
                                        <p className="card-text"><strong>Is Available:</strong> {sub.isAvailable ? "Yes" : "No"}</p>
                                      </>
                                    )}
                                    <button
                                      className="btn btn-warning btn-sm me-2"
                                      onClick={() => handleOpenModal("updateSubcategory", category, sub)}
                                      style={styles.updateButton}
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => handleDeleteSubcategory(category.id, sub.id)}
                                      style={styles.deleteButton}
                                    >
                                      Delete
                                    </button>
                                  </li>
                                ))}
                                <li className="list-group-item" style={styles.subcategoryItem}>
                                  <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => handleOpenModal("addSubcategory", category)}
                                    style={styles.addButton}
                                  >
                                    Add New Subcategory
                                  </button>
                                </li>
                              </ul>
                            </div>
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "add" ? "Add Main Category" : modalType === "update" ? "Update Main Category" : "Add Subcategory"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modalBody}>
            {modalType === "addSubcategory" || modalType === "updateSubcategory" ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newSubcategory.name}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter subcategory name"
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newSubcategory.description}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter subcategory description"
                    rows={3}
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="stockQuantity"
                    value={newSubcategory.stockQuantity}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter stock quantity"
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleSubcategoryInputChange}
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    name="isAvailable"
                    label="Is Available"
                    checked={newSubcategory.isAvailable}
                    onChange={(e) => setNewSubcategory((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                    style={styles.checkbox}
                  />
                </Form.Group>
              </Form>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="Enter category name"
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Enter category description"
                    rows={3}
                    style={styles.input}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} style={styles.modalButton}>
              Close
            </Button>
            <Button variant="primary" onClick={modalType === "addSubcategory" || modalType === "updateSubcategory" ? handleSaveSubcategory : handleSaveCategory} style={styles.modalButton}>
              Save Changes
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
  categoryNameButton: {
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    fontWeight: "bold",
  },
  viewButton: {
    backgroundColor: "#007bff",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
    marginBottom: "5px",
  },
  updateButton: {
    backgroundColor: "#ffc107",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "5px",
    marginBottom: "5px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "5px",
  },
  addButton: {
    backgroundColor: "#28a745",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "5px",
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
  subcategoryItem: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  subcategoryViewButton: {
    color: "#007bff",
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    marginLeft: "10px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  modalBody: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  input: {
    borderRadius: "5px",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "10px",
  },
  checkbox: {
    marginTop: "10px",
    marginLeft: "10px",
    transform: "scale(1.2)",
  },
  modalButton: {
    marginRight: "5px",
    marginBottom: "5px",
  },
};

export default ManageItems;
