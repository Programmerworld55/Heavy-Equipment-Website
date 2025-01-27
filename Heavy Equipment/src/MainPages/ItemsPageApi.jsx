import React, { useEffect } from "react";

const API_BASE_URL = "https://abfd5970-a094-42c1-8e4f-35c799d9477d.mock.pstmn.io";

export const fetchMainCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_POSTMAN_API_KEY", // Replace with your Postman API key if required
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch main categories: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching main categories:", error.message);
    throw error;
  }
};

const ItemsPageApi = ({ setCategories }) => {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchMainCategories();
        setCategories(data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    fetchCategories();
  }, [setCategories]);

  return null; // This component does not render anything
};

export default ItemsPageApi;
