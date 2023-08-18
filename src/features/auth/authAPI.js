// A mock function to mimic making an async request for data
import axios from "axios";
export function createUser(data) {
  return new Promise(async (resolve) => {
    const response = await axios.post(
      "http://localhost:8000/auth/signup",
      data
    );
    // console.log(response);
    resolve(response);
  });
}
export function loginUser(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/auth/login`,
        data
      );
      console.log(response);
      resolve(response);
    } catch (err) {
      reject("Invalid credentials");
    }
    // console.log("res",response)
  });
}
export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("http://localhost:8000/auth/check");
      console.log("check",response);
      resolve(response);
    } catch (err) {
      reject("Invalid credentials");
    }
  });
}
export function updateUser(data) {
  return new Promise(async (resolve) => {
    const response = await axios.patch(
      `http://localhost:8000/auth/${data.id}`,
      data
    );
    resolve(data);
  });
}
