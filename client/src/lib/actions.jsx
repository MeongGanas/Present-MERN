import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

export async function loginUser(email, password) {
  try {
    const response = await axios.post(
      "https://present-server-nine.vercel.app/api/user/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, email, password) {
  try {
    const response = await axios.post(
      "https://present-server-nine.vercel.app/api/user/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function logoutUser(setUserData, setToken) {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  localStorage.removeItem("userId");
  setToken(null);
  setUserData(null);
}

export async function createAbsentee(name, ownerName, userId, username) {
  try {
    const response = await axios.post(
      `https://present-server-nine.vercel.app/api/absentee/create/${userId}`,
      {
        name,
        ownerName,
        username,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function joinAbsentee(code, displayName, userId, username) {
  try {
    const response = await axios.post(
      `https://present-server-nine.vercel.app/api/absentee/join`,
      {
        code,
        displayName,
        userId,
        username,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function leaveAbsentee(absentId, userId) {
  try {
    const response = await axios.patch(
      `https://present-server-nine.vercel.app/api/absentee/leave/${absentId}/${userId}`
    );
    return response;
  } catch (err) {
    throw err;
  }
}
