import { LIB_NAME, LIB_VERSION } from "./constants";

class Formaggino {
  constructor() {
    this._name = LIB_NAME;
    this.version = LIB_VERSION;
  }

  setupRequest({ method, body, headers }) {
    headers = { ...headers };
    if (!(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    var myHeaders = new Headers();
    Object.keys(headers).forEach((key) => myHeaders.append(key, headers[key]));
    return {
      method: method ? method : "POST",
      headers: myHeaders,
      body,
    };
  }

  get(url, data) {
    const options = this.setupRequest({
      method: "GET",
    });
    const params = new URLSearchParams(data);
    if (params) {
      return fetch(url + params, options);
    } else {
      return fetch(url, options);
    }
  }

  post(url, data) {
    const options = this.setupRequest({
      method: "POST",
      body: data,
    });
    return fetch(url, options);
  }

  checkError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  validate(form, { errorClass, loadingClass, mode } = {}) {
    form.preventDefault();
    const formEl = form.target;
    const url = formEl.action;
    const type = formEl.method;
    let data = new FormData(formEl);

    // fields errors
    const classError = errorClass ? errorClass : "form-error";
    const list = formEl.querySelectorAll(":invalid");
    const validFields = formEl.querySelectorAll(".active");

    // loading element
    const loading = loadingClass ? loadingClass : "form-loading";
    const loadingEl = document.querySelector(`.${loading}`);
    const dataFormat = mode ? mode : "form-data";
    console.log(classError);
    if (dataFormat === "json") {
      data = Object.fromEntries(data.entries());
    }
    // reset for validation
    validFields.forEach((el) => el.classList.remove("active"));

    if (formEl.checkValidity()) {
      loadingEl.classList.add("active");
      if (type === "post") {
        this.post(url, data)
          .then(this.checkError)
          .then((response) => {
            formEl.reset();
          })
          .catch((error) => console.log(error, 'catch'))
          .finally(() => {
            loadingEl.classList.remove("active");
          });
      }
    } else {
      list.forEach((el) => {
        while (el) {
          if (el.classList.contains(classError)) {
            el.classList.add("active");
          }
          el = el.nextElementSibling;
        }
      });
    }
  }
}

export default Formaggino;
