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

export function getSingleAbsentee(absentee, absentId) {
  return absentee.filter((absent) => absent._id === absentId)[0];
}

export async function createAbsentHour(absentId, data) {
  try {
    const response = await axios.patch(
      `https://present-server-nine.vercel.app/api/absentee/createAbsentHour/${absentId}`,
      data
    );
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function editAsParticipant(absentId, userId, data) {
  try {
    await axios
      .patch(
        `https://present-server-nine.vercel.app/api/absentee/edit/participant/${absentId}/${userId}`,
        {
          newUsername: data,
        }
      )
      .then((res) => console.log(res));
  } catch (err) {
    throw err;
  }
}
