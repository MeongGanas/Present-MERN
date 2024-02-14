import axios from "axios";

export function getAbsentee(userId) {
  try {
    return axios
      .get(
        `https://present-server-nine.vercel.app/api/absentee/getAll/${userId}`
      )
      .then((res) => res.data);
  } catch (err) {
    throw err;
  }
}

export function getSingleAbsentee(absentId) {
  try {
    return axios
      .get(
        `https://present-server-nine.vercel.app/api/absentee/getSingle/${absentId}`
      )
      .then((res) => res.data);
  } catch (err) {
    throw err;
  }
}
