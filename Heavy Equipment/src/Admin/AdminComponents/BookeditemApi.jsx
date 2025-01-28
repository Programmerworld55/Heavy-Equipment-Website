// const API_BASE_URL = "http://localhost:3000/api"; // Update with your backend API URL
const API_BASE_URL="https://f8acd16b-b371-42b1-9700-bec95ebddaf0.mock.pstmn.io"

export const fetchAvailableItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch available items");
    }
    const data = await response.json();
    return data.map(category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
      subcategories: category.subcategories.map(sub => ({
        name: sub.name,
        description: sub.description,
        image: sub.image,
        stockQuantity: sub.stockQuantity,
        isAvailable: sub.isAvailable,
        rentalPrice: sub.rentalPrice,
        buyPrice: sub.buyPrice,
      }))
    }));
  } catch (error) {
    console.error("Error fetching available items:", error);
    throw error;
  }
};

export const fetchBoughtItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bought items");
    }
    const data = await response.json();
    return data.map(category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
      subcategories: category.subcategories.map(sub => ({
        name: sub.name,
        description: sub.description,
        image: sub.image,
        stockQuantity: sub.stockQuantity,
        isAvailable: sub.isAvailable,
        rentalPrice: sub.rentalPrice,
        buyPrice: sub.buyPrice,
      }))
    }));
  } catch (error) {
    console.error("Error fetching bought items:", error);
    throw error;
  }
};

export const fetchRentedItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rented items");
    }
    const data = await response.json();
    return data.map(category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
      subcategories: category.subcategories.map(sub => ({
        name: sub.name,
        description: sub.description,
        image: sub.image,
        stockQuantity: sub.stockQuantity,
        isAvailable: sub.isAvailable,
        rentalPrice: sub.rentalPrice,
        buyPrice: sub.buyPrice,
      }))
    }));
  } catch (error) {
    console.error("Error fetching rented items:", error);
    throw error;
  }
};

export const updateItemStatus = async (transactionId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${transactionId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error("Failed to update item status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item status:", error);
    throw error;
  }
};
