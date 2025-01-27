// const API_BASE_URL = "http://localhost:3000/api"; // Update with your backend API URL
const API_BASE_URL="https://92eafd4f-8224-4949-8e75-61aa66296f63.mock.pstmn.io"
export const fetchUsers = async () => {
  try {
    // const response = await fetch(`${API_BASE_URL}/auth/users`, {
      const response = await fetch(`${API_BASE_URL}/users`, {

      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("Failed to delete user");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
