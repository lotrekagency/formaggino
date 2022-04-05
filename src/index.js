import { LIB_NAME, LIB_VERSION } from "./constants";

class Formaggino {
  constructor() {
    this._name = LIB_NAME;
    this.version = LIB_VERSION;
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
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

  checkInputError(e, classError) {
    this.errorFinder(e.target, classError, e.target.checkValidity());
  }

  errorFinder(el, classError, valid) {
    while (el) {
      if (el.classList.contains(classError) && !valid) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
      el = el.nextElementSibling;
    }
  }

  triggerReport(el, timing) {
    document.querySelector(`.${el}`).classList.add("active");
    setTimeout(() => {
      document.querySelector(`.${el}`).classList.remove("active");
    }, timing);
  }

  validate(form, { errorClass } = {}) {
    form.preventDefault();
    console.log(form);
    const formEl = form.target;

    // fields errors
    const classError = errorClass ? errorClass : "form-error";
    const list = formEl.querySelectorAll(":invalid");
    const validFields = formEl.querySelectorAll(".active");

    // reset for validation
    validFields.forEach((el) => el.classList.remove("active"));

    formEl.addEventListener("change", (e) => {
      this.checkInputError(e, errorClass);
    });

    formEl.addEventListener("keyup", (e) => {
      this.debounce(this.checkInputError(e, errorClass), 400);
    });

    if (formEl.checkValidity()) {
      return true;
    } else {
      list.forEach((el) => {
        this.errorFinder(el, classError, false);
      });
      return false;
    }
  }

  submit(
    form,
    {
      mode,
      loadingClass,
      errorClass,
      formSuccess,
      formError,
      closingTiming,
    } = {}
  ) {
    const formEl = form.target;
    const url = formEl.action;
    const type = formEl.method;
    const dataFormat = mode ? mode : "form-data";
    const loading = loadingClass ? loadingClass : "form-loading";
    const reportError = formError ? formError : "form-report-error";
    const reportSuccess = formSuccess ? formSuccess : "form-report-success";
    const closeAfter = closingTiming ? closingTiming : 3000;
    const loadingEl = document.querySelector(`.${loading}`);
    let data = new FormData(formEl);

    let isValid = this.validate(form, { errorClass });

    if (dataFormat === "json") {
      data = Object.fromEntries(data.entries());
    }

    if (isValid) {
      if (type === "post") {
        loadingEl.classList.add("active");
        this.post(url, data)
          .then(this.checkError)
          .then(() => {
            this.triggerReport(reportSuccess, closeAfter);
            formEl.reset();
          })
          .catch(() => this.triggerReport(reportError, closeAfter))
          .finally(() => {
            loadingEl.classList.remove("active");
          });
      }
    }
  }
}

export default Formaggino;
