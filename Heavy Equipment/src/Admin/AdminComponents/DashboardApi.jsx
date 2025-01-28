const API_BASE_URL = "http://localhost:3000/api"; // Update with your backend API URL

export const fetchUsersStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/users`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users stats:", error);
    throw error;
    
  }
};

export const fetchItemsStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/items`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch items stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching items stats:", error);
    throw error;
  }
};

export const fetchApprovalsStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/approvals`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch approvals stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching approvals stats:", error);
    throw error;
  }
};

export const fetchBookingsStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/bookings`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch bookings stats");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings stats:", error);
    throw error;
  }
};
