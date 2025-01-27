const API_BASE_URL = "http://localhost:3000/api";

export const fetchApprovals = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/approvals`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch approvals");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching approvals:", error);
    throw error;
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const fetchTransactionDetails = async (transactionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch transaction details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transaction details:", error);
    throw error;
  }
};

export const updateTransactionStatus = async (transactionId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions/${transactionId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error("Failed to update transaction status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating transaction status:", error);
    throw error;
  }
};

export const updateItemAvailability = async (itemId, isAvailable) => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isAvailable })
    });
    if (!response.ok) {
      throw new Error("Failed to update item availability");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating item availability:", error);
    throw error;
  }
};
