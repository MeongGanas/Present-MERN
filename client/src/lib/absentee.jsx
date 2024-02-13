import axios from "axios";

export async function getAbsentee(userId) {
  try {
    const response = await axios
      .get(
        `https://present-server-nine.vercel.app/api/absentee/getAll/${userId}`
      )
      .then((res) => res.data.absentee);

    return response;
  } catch (err) {
    throw err;
  }
}
