// ManageItemsApi.jsx
// const API_BASE_URL = "http://localhost:3000/api/admin/items";
const API_BASE_URL ="https://46014bc8-8273-4a40-81bc-6c6ce90e9a23.mock.pstmn.io"

export const fetchMainCategories = async () => {
  try {
    console.log("API_BASE_URL", API_BASE_URL);
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch main categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching main categories:", error);
    throw error;
  }
};

export const saveCategory = async (category, isAdd, categoryId) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("category", category.category);
  formData.append("subcategories", JSON.stringify(category.subcategories));
  formData.append("price", category.price);
  formData.append("rentalRate", JSON.stringify(category.rentalRate));
  formData.append("image", category.image);
  formData.append("isAvailable", category.isAvailable);

  const endpoint = isAdd ? API_BASE_URL : `${API_BASE_URL}/${categoryId}`;
  const method = isAdd ? "POST" : "PUT";

  try {
    const response = await fetch(endpoint, {
      method,
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to save category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error saving category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${categoryId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const saveSubcategory = async (subcategory, categoryId) => {
  const formData = new FormData();
  formData.append("name", subcategory.name);
  formData.append("description", subcategory.description);
  formData.append("price", subcategory.price);
  formData.append("rentalRate", JSON.stringify(subcategory.rentalRate));
  formData.append("image", subcategory.image);
  formData.append("isAvailable", subcategory.isAvailable);

  try {
    const response = await fetch(`${API_BASE_URL}/${categoryId}/subcategories`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add subcategory");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding subcategory:", error);
    throw error;
  }
};

export const updateSubcategory = async (subcategory, categoryId, subcategoryId) => {
  const formData = new FormData();
  formData.append("name", subcategory.name);
  formData.append("description", subcategory.description);
  formData.append("price", subcategory.price);
  formData.append("rentalRate", JSON.stringify(subcategory.rentalRate));
  formData.append("image", subcategory.image);
  formData.append("isAvailable", subcategory.isAvailable);

  try {
    const response = await fetch(`${API_BASE_URL}/${categoryId}/subcategories/${subcategoryId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update subcategory");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};

export const deleteSubcategory = async (categoryId, subcategoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${categoryId}/subcategories/${subcategoryId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error("Failed to delete subcategory");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};
