// A mock function to mimic making an async request for data
import axios from "axios";
export function createUser(data) {
  return new Promise(async (resolve) => {
    const response = await axios.post("http://localhost:8000/users", data);
    // console.log(response);
    resolve(response);
  });
}
export function loginUser(dat1) {
  return new Promise(async (resolve, reject) => {
    const email = dat1.email;
    const password = dat1.password;
    console.log(email, password);
    const response = await axios.get(
      `http://localhost:8000/users?email=${dat1.email}`,
      dat1
    );
    // console.log("response", response);
    if (
      response.data.length &&
      response.data[0].email == email &&
      response.data[0].password == password
    )
      resolve(response);
    else reject("Wrong credentials");
  });
}
