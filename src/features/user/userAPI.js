// A mock function to mimic making an async request for data
import axios from "axios";

export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/users/own`);
    console.log("logged in user fetched",response.data)
    resolve(response);
  });
}
export function updateUser(data) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      `http://localhost:8000/users/${data.id}`,
      data
    );
    resolve(data);
  });
}
