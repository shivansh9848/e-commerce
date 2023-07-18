// A mock function to mimic making an async request for data
import axios from "axios";
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

export function addToCart(data) {
  return new Promise(async (resolve, isRejected) => {
    try {
      const response = await axios.post("http://localhost:8000/cart", data);
      // console.log("cart", data);
      resolve(response);
    } catch (err) {
      isRejected("something wrong");
    }
  });
}

export function updateCart(obj) {
  return new Promise(async (resolve, isRejected) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/cart/${obj.id}`,
        {
          quantity: obj.quantity,
        }
      );
      resolve(obj);
    } catch (err) {
      isRejected("something wrong");
    }
  });
}

export function deleteItem(id) {
  return new Promise(async (resolve) => {
    const response = await axios.delete(`http://localhost:8000/cart/${id}`);
    // console.log("xyz", response);
    resolve({ data: id });
  });
}
export function resetCart(user) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetchItemsByUserID(user);
      console.log("1", response);
      const deletePromises = response.data.map((curr) => {
        deleteItem(curr.id);
      });
      await Promise.all(deletePromises);
      resolve({ data: user });
    } catch (err) {
      reject("something wrong");
    }
  });
}
