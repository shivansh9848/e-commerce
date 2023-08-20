// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchItemsByUserID() {
  return new Promise(async (resolve, isRejected) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/cart`
      );
      resolve(response);
    } catch (err) {
      isRejected("something wrong");
    }
  });
}

export function addToCart(data) {
  return new Promise(async (resolve) => {
    const response = await axios.post("http://localhost:8000/api/cart", data);
    resolve(response);
  });
}

export function updateCart(obj) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      `http://localhost:8000/api/cart/${obj.cartItemId}`,
      obj
    );
    resolve(obj);
  });
}

export function deleteItem(id) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`http://localhost:8000/api/cart/${id}`);
    // console.log("xyz", response);
    resolve({ data: id });
  });
}
export function resetCart() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserID();
      console.log("1", response);
      const deletePromises = response.data.map((curr) => {
        deleteItem(curr.id);
      });
      await Promise.all(deletePromises);
      resolve({ status: 'success' });
    } catch (err) {
      reject("something wrong");
    }
  });
}
