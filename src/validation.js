import { debounce } from "./utils";

class Validation {
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
      debounce(this.checkInputError(e, errorClass), 400);
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
}

export default Validation;