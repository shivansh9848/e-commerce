// A mock function to mimic making an async request for data
import axios from "axios";
export function addToCart(data) {
  return new Promise(async (resolve, isRejected) => {
    try {
      const response = await axios.post("http://localhost:8000/cart", data);
      console.log("cart", data);
      resolve(response);
    } catch (err) {
      isRejected("something wrong");
    }
  });
}
export function fetchItemsByUserID(userID) {
  return new Promise(async (resolve, isRejected) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/cart?user=${userID}`
      );
      resolve(response);
    } catch (err) {
      isRejected("something wrong");
    }
  });
}
