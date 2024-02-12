import axios from "axios";

export async function createAbsentee(absentName, ownerName, userId) {
  try {
    const response = await axios.post(`/api/absentee/create/${userId}`, {
      absentName,
      ownerName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
