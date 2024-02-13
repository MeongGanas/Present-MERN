import axios from "axios";
import wrapPromise from "./wrapperPromise";

export function getAbsentee(userId) {
  try {
    const response = axios
      .get(
        `https://present-server-nine.vercel.app/api/absentee/getAll/${userId}`
      )
      .then((res) => res.data);

    return wrapPromise(response);
  } catch (err) {
    throw err;
  }
}
