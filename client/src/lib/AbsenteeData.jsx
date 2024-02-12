import axios from "axios";

export async function createAbsentee(absentName, ownerName, userId) {
  try {
    const response = await axios.post(
      `https://present-server-nine.vercel.app/api/absentee/create/${userId}`,
      { absentName, ownerName }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
