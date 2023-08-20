// A mock function to mimic making an async request for data
import axios from "axios";
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`http://localhost:8000/api/orders`, order);
    // console.log("vid", response);
    resolve(response);
  });
}
export function fetchAllOrders() {
  return new Promise(async (resolve) => {
    const response = await axios.get(`http://localhost:8000/api/orders/`);
    // console.log("vid", response);
    resolve(response);
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    // console.log("oro", order);
    const response = await axios.patch(
      `http://localhost:8000/api/orders/${order.id}`,
      order
    );
    resolve(response);
  });
}

export function fetchLoggedInUsersOrders(userID) {
  return new Promise(async (resolve) => {
    const response = await axios.get(
      `http://localhost:8000/api/orders/own`
    );
    // console.log("userorder",response);
    resolve(response);
  });
}