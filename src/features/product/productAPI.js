// A mock function to mimic making an async request for data
import axios from "axios";
export function fetchAllProducts(pagenation) {
  let queryString = "";
  for (let key in pagenation) {
    queryString += `${key}=${pagenation[key]}&`;
  }
  return new Promise(async (resolve) => {
    const data = await axios.get("http://localhost:8000/products");
    resolve(data);
  });
}
export function fetchProductByID(id) {
  return new Promise(async (resolve) => {
    const data = await axios.get(`http://localhost:8000/products/${id}`);
    // console.log(data);
    resolve(data);
  });
}
export function fetchBrands() {
  return new Promise(async (resolve) => {
    const data = await axios.get("http://localhost:8000/brands");
    resolve(data);
  });
}
export function fetchCategories() {
  return new Promise(async (resolve) => {
    const data = await axios.get("http://localhost:8000/categories");
    resolve(data);
  });
}
export function fetchProductsByFilters(filter, sort, pagenation) {
  //filter={"category":["smartphone"],
  //        "brand":["Apple"]      }
  //sort={"_sort":"price",
  //      "_order":"asc"}
  //pagenation={"_page":1,
  //      "_limit":10}
  let queryString = "";
  for (let key in filter) {
    if (Array.isArray(filter[key]) == 0) {
      queryString += `${key}=${filter[key]}&`;
    } else {
      filter[key].map((curr) => {
        queryString += `${key}=${curr}&`;
      });
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagenation) {
    queryString += `${key}=${pagenation[key]}&`;
  }
  // console.log(queryString);

  return new Promise(async (resolve) => {
    const data = await axios.get(
      `http://localhost:8000/products?${queryString}`
    );
    resolve(data);
  });
}
