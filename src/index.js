import { LIB_NAME, LIB_VERSION } from "./constants";

class Formaggino {
  constructor() {
    this._name = LIB_NAME;
    this.version = LIB_VERSION;
  }

  name() {
    return this._name;
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

  validate(form, errorClass) {
    form.preventDefault();
    const formEl = form.target;
    const classError = errorClass ? errorClass : "form-error";
    const list = formEl.querySelectorAll(":invalid");
    const validFields = formEl.querySelectorAll(".active");
    validFields.forEach((el) => el.classList.remove("active"));
    if (formEl.checkValidity()) {
      return "👌";
    } else {
      list.forEach((el) => {
        const element = el.querySelector(classError)
          ? el
          : el.nextElementSibling;
        if (element.classList.contains(classError))
          element.classList.add("active");
      });

      return "👎";
    }
  }
}

export default Formaggino;
