// A mock function to mimic making an async request for data
import axios from "axios";
export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await axios.post(`http://localhost:8000/orders`, order);
    // console.log("vid", response);
    resolve(response);
  });
}
