import axios from "axios";

export async function createAbsentee(absentName, ownerName) {
  try {
    const response = await axios.post(
      "https://present-server-nine.vercel.app/api/absentee/create",
      { absentName, ownerName }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
