import axios from "axios";

export async function getAbsentee({ userId }) {
  try {
    const response = await axios.get(
      `https://present-server-nine.vercel.app/api/absentee/getAll/${userId}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}
