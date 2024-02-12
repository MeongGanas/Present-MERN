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

export async function createAbsentee(absentName, ownerName, userId) {
  console.log(absentName, ownerName, userId);

  try {
    const response = await axios.post(
      "/api/absentee/create" + userId.toString(),
      {
        absentName,
        ownerName,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}