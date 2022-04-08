export function getDocs(url) {
  console.log(url);
}

export function getPackage(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log([data]));
}
