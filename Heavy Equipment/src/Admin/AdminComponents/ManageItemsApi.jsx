// ManageItemsApi.jsx
// const API_BASE_URL = "https://46014bc8-8273-4a40-81bc-6c6ce90e9a23.mock.pstmn.io";
//  // Replace with your actual backend API URL
// const API_BASE_URL="https://b962900b-0912-49ae-8b36-dfdfd9da9104.mock.pstmn.io"
// const API_BASE_URL="https://6164abe7-e3e3-46ab-9b27-358ebed30cb9.mock.pstmn.io"
// const API_BASE_URL="https://f8acd16b-b371-42b1-9700-bec95ebddaf0.mock.pstmn.io"
const API_BASE_URL="https://abfd5970-a094-42c1-8e4f-35c799d9477d.mock.pstmn.io"


export const fetchMainCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_POSTMAN_API_KEY", // Replace with your Postman API key if required
      },
    });
    console.log("response is ",response)
    if (!response.ok) {
      throw new Error(`Failed to fetch main categories: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data is : ",data)
    return data;
  } catch (error) {
    console.error("Error fetching main categories:", error.message);
    throw error;
  }
};

export const saveCategory = async (category, isAdd, categoryId) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("image", category.image);

  const endpoint = isAdd ? `${API_BASE_URL}/categories` : `${API_BASE_URL}/categories/${categoryId}`;
  const method = isAdd ? "POST" : "PUT";

  try {
    const response = await fetch(endpoint, {
      method,
      body: formData,
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
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

export const updateCategory = async (category, categoryId) => {
  const formData = new FormData();
  formData.append("name", category.name);
  formData.append("description", category.description);
  formData.append("image", category.image);

  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "PUT",
      body: formData,
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
    });

    if (!response.ok) {
      throw new Error("Failed to update category");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
    });
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
  formData.append("image", subcategory.image);
  formData.append("stockQuantity", subcategory.stockQuantity);
  formData.append("isAvailable", subcategory.isAvailable);

  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`, {
      method: "POST",
      body: formData,
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
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
  formData.append("image", subcategory.image);
  formData.append("stockQuantity", subcategory.stockQuantity);
  formData.append("isAvailable", subcategory.isAvailable);

  try {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}`, {
      method: "PUT",
      body: formData,
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
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
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": "YOUR_POSTMAN_API_KEY" // Replace with your Postman API key if required
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete subcategory");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    throw error;
  }
};

