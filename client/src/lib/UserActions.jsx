import axios from "axios";

export async function loginUser(email, password) {
  try {
    const response = await axios.post("/api/user/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post("/api/user/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function logoutUser(setUserData, setToken) {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  setToken(null);
  setUserData(null);
}
