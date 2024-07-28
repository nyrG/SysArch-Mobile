import axios from "axios";

const API_URL = "https://canque-sb.yeems214.xyz";

export const loginAccount = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/loginUser`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const createAccount = async (accountDetails) => {
  try {
    const response = await axios.post(
      `${API_URL}/registerUser`,
      accountDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error creating account", error);
    throw error;
  }
};

export const fetchAllAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/findUsers`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    throw error;
  }
};

export const fetchAccountByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/findUser/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}`, error);
    throw error;
  }
};

export const deleteAccount = async (email) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteUser/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error Deleting account", error);
    throw error;
  }
};

export const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/findOrders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory", error);
    throw error;
  }
};

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${API_URL}/addOrder`, order, {
      headers: {
        "Content-Type": "application/json",
      },
      //withCredentials: true, // If your server requires credentials (like cookies)
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};
