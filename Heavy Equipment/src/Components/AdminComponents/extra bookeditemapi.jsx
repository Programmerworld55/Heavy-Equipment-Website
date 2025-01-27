const API_BASE_URL = "http://localhost:3000";

export const fetchAvailableItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/available`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch available items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching available items:", error);
    throw error;
  }
};

export const fetchBoughtItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/bought`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bought items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bought items:", error);
    throw error;
  }
};

export const fetchRentedItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/rented`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch rented items");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching rented items:", error);
    throw error;
  }
};

export const fetchSubcategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories");
    }
    const data = await response.json();
    return data.map(user => user.company); // Assuming subcategories are stored in the company field
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

export const updateItemStatus = async (transactionId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}/status`, {
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
