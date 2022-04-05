import { LIB_NAME, LIB_VERSION } from "./constants";
import Requests from "./requests";
import Validation from "./validation";
class Formaggino {
  constructor() {
    this._name = LIB_NAME;
    this.version = LIB_VERSION;
    this.request = new Requests();
    this.validation = new Validation();
  }

  checkError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }
  // main method for form submission
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

    let isValid = this.validation.validate(form, { errorClass });

    if (dataFormat === "json") {
      data = Object.fromEntries(data.entries());
    }

    if (isValid) {
      if (type === "post") {
        loadingEl.classList.add("active");
        this.request
          .post(url, data)
          .then(this.checkError)
          .then(() => {
            this.validation.triggerReport(reportSuccess, closeAfter);
            formEl.reset();
          })
          .catch(() => this.validation.triggerReport(reportError, closeAfter))
          .finally(() => {
            loadingEl.classList.remove("active");
          });
      }
    }
  }

  // eventListener for triggering form
  submitEvent(el, options) {
    options = { ...options };
    console.log(el, options);
    document.querySelector(el).addEventListener("submit", (e) => {
      this.submit(e, options);
    });
  }
}

export default Formaggino;
