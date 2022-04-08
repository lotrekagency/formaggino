function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Requests = /*#__PURE__*/function () {
  function Requests() {
    _classCallCheck(this, Requests);
  }

  _createClass(Requests, [{
    key: "setupRequest",
    value: function setupRequest(_ref) {
      var method = _ref.method,
          body = _ref.body,
          headers = _ref.headers;
      headers = _objectSpread2({}, headers);

      if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
      }

      var myHeaders = new Headers();
      Object.keys(headers).forEach(function (key) {
        return myHeaders.append(key, headers[key]);
      });
      return {
        method: method ? method : "POST",
        headers: myHeaders,
        body: body
      };
    }
  }, {
    key: "get",
    value: function get(url, data) {
      var options = this.setupRequest({
        method: "GET"
      });
      var params = new URLSearchParams(data);

      if (params) {
        return fetch(url + params, options);
      } else {
        return fetch(url, options);
      }
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = this.setupRequest({
        method: "POST",
        body: data
      });
      return fetch(url, options);
    }
  }]);

  return Requests;
}();

function debounce(func, wait) {
  var timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      clearTimeout(timeout);
      func.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

var Validation = /*#__PURE__*/function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, [{
    key: "checkInputError",
    value: function checkInputError(e, classError) {
      this.errorFinder(e.target, classError, e.target.checkValidity());
    }
  }, {
    key: "errorFinder",
    value: function errorFinder(el, classError, valid) {
      while (el) {
        if (el.classList.contains(classError) && !valid) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }

        el = el.nextElementSibling;
      }
    }
  }, {
    key: "triggerReport",
    value: function triggerReport(el, timing) {
      document.querySelector(".".concat(el)).classList.add("active");
      setTimeout(function () {
        document.querySelector(".".concat(el)).classList.remove("active");
      }, timing);
    }
  }, {
    key: "validate",
    value: function validate(form) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          errorClass = _ref.errorClass,
          listener = _ref.listener;

      form.preventDefault();
      var formEl = form.target;
      var evtListener = listener ? listener : "change"; // fields errors

      var classError = errorClass ? errorClass : "form-error";
      var list = formEl.querySelectorAll(":invalid");
      var validFields = formEl.querySelectorAll(".active"); // reset for validation

      validFields.forEach(function (el) {
        return el.classList.remove("active");
      });
      formEl.addEventListener(evtListener, function (e) {
        debounce(_this.checkInputError(e, errorClass), 400);
      });

      if (formEl.checkValidity()) {
        return true;
      } else {
        list.forEach(function (el) {
          _this.errorFinder(el, classError, false);
        });
        return false;
      }
    }
  }]);

  return Validation;
}();

var Formaggino = /*#__PURE__*/function () {
  function Formaggino() {
    _classCallCheck(this, Formaggino);

    this.request = new Requests();
    this.validation = new Validation();
  }

  _createClass(Formaggino, [{
    key: "checkError",
    value: function checkError(response) {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    } // main method for form submission

  }, {
    key: "submit",
    value: function submit(form) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          mode = _ref.mode,
          loadingClass = _ref.loadingClass,
          errorClass = _ref.errorClass,
          formSuccess = _ref.formSuccess,
          formError = _ref.formError,
          closingTiming = _ref.closingTiming,
          listener = _ref.listener;

      var formEl = form.target;
      var url = formEl.action;
      var type = formEl.method;
      var dataFormat = mode ? mode : "form-data";
      var loading = loadingClass ? loadingClass : "form-loading";
      var reportError = formError ? formError : "form-report-error";
      var reportSuccess = formSuccess ? formSuccess : "form-report-success";
      var closeAfter = closingTiming ? closingTiming : 3000;
      var loadingEl = document.querySelector(".".concat(loading));
      var data = new FormData(formEl);
      var isValid = this.validation.validate(form, {
        errorClass: errorClass,
        listener: listener
      });

      if (dataFormat === "json") {
        data = Object.fromEntries(data.entries());
      }

      if (isValid) {
        if (type === "post") {
          loadingEl.classList.add("active");
          this.request.post(url, data).then(this.checkError).then(function () {
            _this.validation.triggerReport(reportSuccess, closeAfter);

            formEl.reset();
          }).catch(function () {
            return _this.validation.triggerReport(reportError, closeAfter);
          }).finally(function () {
            loadingEl.classList.remove("active");
          });
        }
      }
    } // eventListener for triggering form

  }, {
    key: "submitEvent",
    value: function submitEvent(el, options) {
      var _this2 = this;

      options = _objectSpread2({}, options);
      document.querySelector(el).addEventListener("submit", function (e) {
        _this2.submit(e, options);
      });
    }
  }]);

  return Formaggino;
}();

export default Formaggino;
