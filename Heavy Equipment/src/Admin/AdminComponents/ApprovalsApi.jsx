const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUserTransactions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user transactions");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching user transactions:", error);
    throw error;
  }
};

export const fetchItemDetails = async (itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${itemId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch item details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching item details:", error);
    throw error;
  }
};

export const updateTransactionStatus = async (transactionId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${transactionId}`, {
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
    const response = await fetch(`${API_BASE_URL}/posts/${itemId}`, {
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

export const sendEmailNotification = async (userId, subject, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, subject, message })
    });
    if (!response.ok) {
      throw new Error("Failed to send email notification");
    }
    return await response.json();
  } catch (error) {
    console.error("Error sending email notification:", error);
    throw error;
  }
};
