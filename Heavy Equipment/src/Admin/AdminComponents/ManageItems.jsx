import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchMainCategories, saveCategory, deleteCategory, saveSubcategory, updateCategory, updateSubcategory, deleteSubcategory } from "./ManageItemsApi";
import { FaTimes, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons
import ErrorBoundary from "./ErrorBoundary";
import './AdminStyles/ManageItems.css'; // Import the CSS file

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
    rentalPrice: "",
    buyPrice: "",
    brand: "",
    model: "",
    manufacturingYear: "",
    usages: "",
    origin: "",
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
    const { name, description, stockQuantity, rentalPrice, buyPrice, brand, model, manufacturingYear, usages, origin } = newSubcategory;
    if (!name || !description || !stockQuantity || !rentalPrice || !buyPrice || !brand || !model || !manufacturingYear || !usages || !origin) {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
  };

  const handleOpenModal = (type, category = null, subcategory = null) => {
    setModalType(type);
    setSelectedCategory(category);
    if (type === "addSubcategory") {
      setNewSubcategory({
        name: "",
        description: "",
        image: null,
        stockQuantity: "",
        isAvailable: false,
        rentalPrice: "",
        buyPrice: "",
        brand: "",
        model: "",
        manufacturingYear: "",
        usages: "",
        origin: "",
      });
    } else if (type === "updateSubcategory") {
      setNewSubcategory(subcategory);
    } else if (type === "add") {
      if (modalType === "viewDetails") {
        setModalType("addSubcategory");
        setNewSubcategory({
          name: "",
          description: "",
          image: null,
          stockQuantity: "",
          isAvailable: false,
          rentalPrice: "",
          buyPrice: "",
          brand: "",
          model: "",
          manufacturingYear: "",
          usages: "",
          origin: "",
        });
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
    setSelectedCategory(category);
    setShowModal(true);
    setModalType("viewDetails");
  };

  const handleToggleSubcategoryDetails = (subcategoryId) => {
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }));
  };

  return (
    <ErrorBoundary>
      <div className="container mt-4 dashboardContainer" style={{ maxWidth: '95%' }}>
        <h2 className="mb-4 text-center" style={{ color: "#FF6F61" }}>Manage Items</h2>
        <Button
          variant="primary"
          className="mb-3 addButton"
          onClick={() => handleOpenModal("add")}
        >
          <FaPlus /> Add Main Category
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
                    <td><strong>{index + 1}</strong></td>
                    <td>
                      <button
                        className="btn btn-link categoryNameButton"
                        onClick={() => handleViewDetails(category)}
                      >
                        {category.name}
                      </button>
                    </td>
                    <td><strong>{category.description}</strong></td>
                    <td>
                      <div className="actionButtons">
                        <button
                          className="btn btn-info btn-sm viewButton"
                          onClick={() => handleViewDetails(category)}
                        >
                          <FaEye /> View Details
                        </button>
                        <button
                          className="btn btn-warning btn-sm updateButton"
                          onClick={() => handleOpenModal("update", category)}
                        >
                          <FaEdit /> Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm deleteButton"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "add" ? "Add Main Category" : modalType === "update" ? "Update Main Category" : modalType === "viewDetails" ? "Category Details" : "Add Subcategory"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modalBody">
            {modalType === "viewDetails" ? (
              <>
                <h5 className="categoryTitle">{selectedCategory.name}</h5>
                <p className="categoryDescription">{selectedCategory.description}</p>
                <p><strong>Total Subcategories:</strong> {selectedCategory.subcategories ? selectedCategory.subcategories.length : 0}</p>
                <ul className="list-group">
                  {selectedCategory.subcategories && selectedCategory.subcategories.map((sub, subIndex) => (
                    <li key={subIndex} className="list-group-item d-flex justify-content-between align-items-center subcategoryItem">
                      <div>
                        <strong>{sub.name}</strong>
                        {expandedSubcategories[sub.id] && (
                          <>
                            <p className="card-text"><strong>Description:</strong> {sub.description}</p>
                            <p className="card-text"><strong>Stock Quantity:</strong> {sub.stockQuantity}</p>
                            <p className="card-text"><strong>Rental Price:</strong> {sub.rentalPrice}</p>
                            <p className="card-text"><strong>Buy Price:</strong> {sub.buyPrice}</p>
                            <p className="card-text"><strong>Brand:</strong> {sub.brand}</p>
                            <p className="card-text"><strong>Model:</strong> {sub.model}</p>
                            <p className="card-text"><strong>Manufacturing Year:</strong> {sub.manufacturingYear}</p>
                            <p className="card-text"><strong>Usages:</strong> {sub.usages}</p>
                            <p className="card-text"><strong>Origin:</strong> {sub.origin}</p>
                            <p className="card-text"><strong>Is Available:</strong> {sub.isAvailable ? "Yes" : "No"}</p>
                          </>
                        )}
                      </div>
                      <div className="d-flex align-items-center subcategoryButtons">
                        <button
                          className="btn btn-link subcategoryViewButton"
                          onClick={() => handleToggleSubcategoryDetails(sub.id)}
                        >
                          {expandedSubcategories[sub.id] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          className="btn btn-warning btn-sm updateButton"
                          onClick={() => handleOpenModal("updateSubcategory", selectedCategory, sub)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm deleteButton"
                          onClick={() => handleDeleteSubcategory(selectedCategory.id, sub.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : modalType === "addSubcategory" || modalType === "updateSubcategory" ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newSubcategory.name}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter subcategory name"
                    className="input"
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
                    className="input"
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
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rental Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="rentalPrice"
                    value={newSubcategory.rentalPrice}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter rental price"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Buy Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="buyPrice"
                    value={newSubcategory.buyPrice}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter buy price"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={newSubcategory.brand}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter brand"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="model"
                    value={newSubcategory.model}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter model"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Manufacturing Year</Form.Label>
                  <Form.Control
                    type="number"
                    name="manufacturingYear"
                    value={newSubcategory.manufacturingYear}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter manufacturing year"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Usages</Form.Label>
                  <Form.Control
                    type="text"
                    name="usages"
                    value={newSubcategory.usages}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter usages"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    name="origin"
                    value={newSubcategory.origin}
                    onChange={handleSubcategoryInputChange}
                    placeholder="Enter origin"
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleSubcategoryInputChange}
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    name="isAvailable"
                    label="Is Available"
                    checked={newSubcategory.isAvailable}
                    onChange={(e) => setNewSubcategory((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                    className="checkbox"
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
                    className="input"
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
                    className="input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    className="input"
                  />
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)} className="enhancedButton">
              <FaTimes className="buttonIcon" /> Close
            </Button>
            {modalType === "viewDetails" && (
              <Button variant="success" onClick={() => handleOpenModal("add")} className="enhancedButton">
                <FaPlus className="buttonIcon" /> Add New Category
              </Button>
            )}
            {modalType !== "viewDetails" && (
              <Button variant="primary" onClick={modalType === "addSubcategory" || modalType === "updateSubcategory" ? handleSaveSubcategory : handleSaveCategory} className="enhancedButton">
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        <ToastContainer limit={1} />
      </div>
    </ErrorBoundary>
  );
};

export default ManageItems;
