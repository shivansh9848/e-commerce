// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchLoggedInUsersOrders(userID) {
  return new Promise(async (resolve) => {
    const response = await axios.get(
      `http://localhost:8000/orders?user=${userID}`
    );
    // console.log(response);
    resolve(response);
  });
}
export function fetchLoggedInUser(userID) {
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/users/${userID}`);
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
