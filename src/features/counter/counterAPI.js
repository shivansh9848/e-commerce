// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount == 5) resolve({ data: amount });
      else reject({ data: -1 });
    }, 500);
  });
}
