'use strict';

function getDocs(url) {
  console.log(url);
}

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

var name = "formaggino";
var version = "1.0.1";
var description = "A small vanilla js library for validate your forms";
var main = "dist/Formaggino.cjs.min.js";
var module$1 = "dist/Formaggino.esm.min.js";
var unpkg = "dist/Formaggino.umd.min.js";
var files = [
	"src/",
	"dist/"
];
var scripts = {
	serve: "http-server ./docs",
	build: "rollup -c --environment BUILD:production",
	dev: "rollup -c -w",
	"docs:build": "rollup -c docs/rollup.config.js --environment BUILD:production",
	"docs:dev": "concurrently 'rollup -c docs/rollup.config.js -w' 'yarn serve'",
	lint: "eslint src/**/*.js",
	test: "cypress open",
	prepare: "npm-run-all lint build"
};
var repository = {
	type: "git",
	url: "git+https://github.com/lotrekagency/formaggino.git"
};
var keywords = [
];
var author = "Pierdomenico Reitano <pierdomenicoreitano@gmail.com>";
var license = "MIT";
var bugs = {
	url: "https://github.com/lotrekagency/formaggino/issues"
};
var homepage = "https://lotrekagency.github.io/formaggino/";
var devDependencies = {
	"@babel/core": "~7.12.10",
	"@babel/plugin-proposal-object-rest-spread": "~7.12.1",
	"@babel/preset-env": "~7.12.11",
	"@babel/register": "~7.12.10",
	"@jackfranklin/rollup-plugin-markdown": "^0.3.0",
	"@rollup/plugin-babel": "~5.2.2",
	"@rollup/plugin-commonjs": "~17.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "~11.1.0",
	concurrently: "^7.1.0",
	"cross-env": "~7.0.3",
	cypress: "^9.5.3",
	eslint: "~7.18.0",
	"http-server": "^14.1.0",
	mustache: "^4.2.0",
	"node-sass": "^7.0.1",
	"npm-run-all": "~4.1.5",
	rollup: "~2.38.0",
	"rollup-plugin-scss": "^3.0.0",
	"rollup-plugin-terser": "~7.0.2"
};
var dependencies = {
};
var browserslist = "> 0.5%, last 2 versions, Firefox ESR, not dead";
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	module: module$1,
	unpkg: unpkg,
	files: files,
	scripts: scripts,
	repository: repository,
	keywords: keywords,
	author: author,
	license: license,
	bugs: bugs,
	homepage: homepage,
	devDependencies: devDependencies,
	dependencies: dependencies,
	browserslist: browserslist
};

var readme = {"html":"<p><a href=\"./LICENSE\"><img src=\"https://img.shields.io/badge/license-MIT-green?style=flat-square\" alt=\"GitHub\" /></a></p>\n<h1 id=\"🧀-formaggino\">🧀 Formaggino</h1>\n<p>A small vanilla js library for validate your forms without external dependencies</p>\n<h2 id=\"getting-started\">Getting started</h2>\n<p>Install the package</p>\n<p><code>npm install formaggino</code></p>\n<p>Initialize the library</p>\n<pre><code class=\"js language-js\">import Formaggino from \"formaggino\";\nconst formaggino = new Formaggino();</code></pre>\n<p>Create a form remember to include <code>method</code>, <code>action</code> and <code>novalidate</code> on your form</p>\n<pre><code class=\"html language-html\">&lt;form\n  method=\"POST\"\n  id=\"form\"\n  action=\"https://your-action.io/sendform\"\n  novalidate\n&gt;\n  &lt;input name=\"name\" type=\"text\" required /&gt;\n  &lt;span class=\"form-error\"&gt;Your error text&lt;/span&gt;\n  ...\n  &lt;div class=\"form-report-error\"&gt;error&lt;/div&gt;\n  &lt;div class=\"form-report-success\"&gt;success&lt;/div&gt;\n  &lt;span class=\"form-loading\"&gt; loading... &lt;/span&gt;\n  &lt;button type=\"submit\"&gt;submit&lt;/button&gt;\n&lt;/form&gt;</code></pre>\n<p>call the <code>submitEvent</code> method</p>\n<pre><code class=\"js language-js\">formaggino.submitEvent(\"#form\");</code></pre>\n<p>or use the options</p>\n<pre><code class=\"js language-js\">formaggino.submitEvent(\"#form\"{\n  mode: 'json',\n  loadingClass: 'your-loading__custom_class',\n  closingTimint: 8000\n  ...\n});</code></pre>\n<p>don't forget to set you css</p>\n<pre><code class=\"css language-css\">.form-error,\n.invalid-feedback,\n.form-loading,\n.form-report-error,\n.form-report-success {\n  display: none;\n}\n\n.active {\n  display: block;\n}</code></pre>\n<h1 id=\"options\">Options</h1>\n<table>\n<thead>\n<tr>\n<th id=\"option\" style=\"text-align:left;\">Option</th>\n<th id=\"type\" style=\"text-align:center;\">Type</th>\n<th id=\"default\" style=\"text-align:left;\">Default</th>\n<th id=\"description\">Description</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style=\"text-align:left;\">mode</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>form-data</code></td>\n<td>the type of data to send to fetch request, you can also use <code>json</code></td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">loadingClass</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>form-loading</code></td>\n<td>the css class for loading element</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">errorClass</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>form-error</code></td>\n<td>the css class for each single field of form</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">formSuccess</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>form-report-success</code></td>\n<td>the css class for form success element</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">formError</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>form-report-error</code></td>\n<td>the css class for form error element</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">closingTiming</td>\n<td style=\"text-align:center;\">integer</td>\n<td style=\"text-align:left;\"><code>3000</code></td>\n<td>timeout for form report duration</td>\n</tr>\n<tr>\n<td style=\"text-align:left;\">listener</td>\n<td style=\"text-align:center;\">string</td>\n<td style=\"text-align:left;\"><code>change</code></td>\n<td>the event listener for each single field in form</td>\n</tr>\n</tbody>\n</table>\n<h2 id=\"contributing\">Contributing</h2>\n<h3 id=\"build-for-development\">Build for development</h3>\n<ul>\n<li>Having all the dependencies installed run <code>npm run dev</code>. This command will generate <code>UMD</code> (unminified), <code>CommonJS</code> and <code>ESM</code> modules under the <code>dist</code> folder. It will also watch for changes in source files to recompile.</li>\n</ul>\n<h3 id=\"build-for-production\">Build for production</h3>\n<ul>\n<li>Having all the dependencies installed run <code>npm run build</code>. This command will generate the same modules as above and one extra minified <code>UMD</code> bundle for usage in browser.</li>\n</ul>\n<h2 id=\"scripts\">Scripts</h2>\n<ul>\n<li><code>npm run serve</code> - serve the project with http-server.</li>\n<li><code>npm run build</code> - Produces production version of library modules under <code>dist</code> folder.</li>\n<li><code>npm run dev</code> - Produces a development version of library and runs a watcher to watch for changes.</li>\n<li><code>npm run docs:build</code> - Produces production version of library docs under <code>docs</code> folder.</li>\n<li><code>npm run docs:dev</code> - Produces a development version of library docs under <code>docs</code> folder.</li>\n<li><code>npm run test</code> - Runs the tests.</li>\n<li><code>npm run lint</code> - Lints the source code with ESlint.</li>\n<li><code>npm run prepare</code> - Run both BEFORE the package is packed and published, on local npm install without any arguments, and when installing git dependencies.</li>\n</ul>\n<h2 id=\"license\">License</h2>\n<p><a href=\"https://github.com/lotrekagency/formaggino/blob/3415e9878e9c90ddc39daad87d71820fca65d925/LICENSE\">The MIT License (MIT)</a></p>","metadata":{},"filename":"README.md","path":"/Users/pierdomenicoreitano/Documents/Projects/formaggino/README.md"};

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

var objectToString = Object.prototype.toString;
var isArray = Array.isArray || function isArrayPolyfill (object) {
  return objectToString.call(object) === '[object Array]';
};

function isFunction (object) {
  return typeof object === 'function';
}

/**
 * More correct typeof string handling array
 * which normally returns typeof 'object'
 */
function typeStr (obj) {
  return isArray(obj) ? 'array' : typeof obj;
}

function escapeRegExp (string) {
  return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
}

/**
 * Null safe way of checking whether or not an object,
 * including its prototype, has a given property
 */
function hasProperty (obj, propName) {
  return obj != null && typeof obj === 'object' && (propName in obj);
}

/**
 * Safe way of detecting whether or not the given thing is a primitive and
 * whether it has the given property
 */
function primitiveHasOwnProperty (primitive, propName) {
  return (
    primitive != null
    && typeof primitive !== 'object'
    && primitive.hasOwnProperty
    && primitive.hasOwnProperty(propName)
  );
}

// Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
// See https://github.com/janl/mustache.js/issues/189
var regExpTest = RegExp.prototype.test;
function testRegExp (re, string) {
  return regExpTest.call(re, string);
}

var nonSpaceRe = /\S/;
function isWhitespace (string) {
  return !testRegExp(nonSpaceRe, string);
}

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}

var whiteRe = /\s*/;
var spaceRe = /\s+/;
var equalsRe = /\s*=/;
var curlyRe = /\s*\}/;
var tagRe = /#|\^|\/|>|\{|&|=|!/;

/**
 * Breaks up the given `template` string into a tree of tokens. If the `tags`
 * argument is given here it must be an array with two string values: the
 * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
 * course, the default is to use mustaches (i.e. mustache.tags).
 *
 * A token is an array with at least 4 elements. The first element is the
 * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
 * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
 * all text that appears outside a symbol this element is "text".
 *
 * The second element of a token is its "value". For mustache tags this is
 * whatever else was inside the tag besides the opening symbol. For text tokens
 * this is the text itself.
 *
 * The third and fourth elements of the token are the start and end indices,
 * respectively, of the token in the original template.
 *
 * Tokens that are the root node of a subtree contain two more elements: 1) an
 * array of tokens in the subtree and 2) the index in the original template at
 * which the closing tag for that section begins.
 *
 * Tokens for partials also contain two more elements: 1) a string value of
 * indendation prior to that tag and 2) the index of that tag on that line -
 * eg a value of 2 indicates the partial is the third tag on this line.
 */
function parseTemplate (template, tags) {
  if (!template)
    return [];
  var lineHasNonSpace = false;
  var sections = [];     // Stack to hold section tokens
  var tokens = [];       // Buffer to hold the tokens
  var spaces = [];       // Indices of whitespace tokens on the current line
  var hasTag = false;    // Is there a {{tag}} on the current line?
  var nonSpace = false;  // Is there a non-space char on the current line?
  var indentation = '';  // Tracks indentation for tags that use it
  var tagIndex = 0;      // Stores a count of number of tags encountered on a line

  // Strips all whitespace tokens array for the current line
  // if there was a {{#tag}} on it and otherwise only space.
  function stripSpace () {
    if (hasTag && !nonSpace) {
      while (spaces.length)
        delete tokens[spaces.pop()];
    } else {
      spaces = [];
    }

    hasTag = false;
    nonSpace = false;
  }

  var openingTagRe, closingTagRe, closingCurlyRe;
  function compileTags (tagsToCompile) {
    if (typeof tagsToCompile === 'string')
      tagsToCompile = tagsToCompile.split(spaceRe, 2);

    if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
      throw new Error('Invalid tags: ' + tagsToCompile);

    openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
    closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
    closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
  }

  compileTags(tags || mustache.tags);

  var scanner = new Scanner(template);

  var start, type, value, chr, token, openSection;
  while (!scanner.eos()) {
    start = scanner.pos;

    // Match any text between tags.
    value = scanner.scanUntil(openingTagRe);

    if (value) {
      for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
        chr = value.charAt(i);

        if (isWhitespace(chr)) {
          spaces.push(tokens.length);
          indentation += chr;
        } else {
          nonSpace = true;
          lineHasNonSpace = true;
          indentation += ' ';
        }

        tokens.push([ 'text', chr, start, start + 1 ]);
        start += 1;

        // Check for whitespace on the current line.
        if (chr === '\n') {
          stripSpace();
          indentation = '';
          tagIndex = 0;
          lineHasNonSpace = false;
        }
      }
    }

    // Match the opening tag.
    if (!scanner.scan(openingTagRe))
      break;

    hasTag = true;

    // Get the tag type.
    type = scanner.scan(tagRe) || 'name';
    scanner.scan(whiteRe);

    // Get the tag value.
    if (type === '=') {
      value = scanner.scanUntil(equalsRe);
      scanner.scan(equalsRe);
      scanner.scanUntil(closingTagRe);
    } else if (type === '{') {
      value = scanner.scanUntil(closingCurlyRe);
      scanner.scan(curlyRe);
      scanner.scanUntil(closingTagRe);
      type = '&';
    } else {
      value = scanner.scanUntil(closingTagRe);
    }

    // Match the closing tag.
    if (!scanner.scan(closingTagRe))
      throw new Error('Unclosed tag at ' + scanner.pos);

    if (type == '>') {
      token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
    } else {
      token = [ type, value, start, scanner.pos ];
    }
    tagIndex++;
    tokens.push(token);

    if (type === '#' || type === '^') {
      sections.push(token);
    } else if (type === '/') {
      // Check section nesting.
      openSection = sections.pop();

      if (!openSection)
        throw new Error('Unopened section "' + value + '" at ' + start);

      if (openSection[1] !== value)
        throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
    } else if (type === 'name' || type === '{' || type === '&') {
      nonSpace = true;
    } else if (type === '=') {
      // Set the tags for the next time around.
      compileTags(value);
    }
  }

  stripSpace();

  // Make sure there are no open sections when we're done.
  openSection = sections.pop();

  if (openSection)
    throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

  return nestTokens(squashTokens(tokens));
}

/**
 * Combines the values of consecutive text tokens in the given `tokens` array
 * to a single token.
 */
function squashTokens (tokens) {
  var squashedTokens = [];

  var token, lastToken;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    if (token) {
      if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
        lastToken[1] += token[1];
        lastToken[3] = token[3];
      } else {
        squashedTokens.push(token);
        lastToken = token;
      }
    }
  }

  return squashedTokens;
}

/**
 * Forms the given array of `tokens` into a nested tree structure where
 * tokens that represent a section have two additional items: 1) an array of
 * all tokens that appear in that section and 2) the index in the original
 * template that represents the end of that section.
 */
function nestTokens (tokens) {
  var nestedTokens = [];
  var collector = nestedTokens;
  var sections = [];

  var token, section;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    token = tokens[i];

    switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
    }
  }

  return nestedTokens;
}

/**
 * A simple string scanner that is used by the template parser to find
 * tokens in template strings.
 */
function Scanner (string) {
  this.string = string;
  this.tail = string;
  this.pos = 0;
}

/**
 * Returns `true` if the tail is empty (end of string).
 */
Scanner.prototype.eos = function eos () {
  return this.tail === '';
};

/**
 * Tries to match the given regular expression at the current position.
 * Returns the matched text if it can match, the empty string otherwise.
 */
Scanner.prototype.scan = function scan (re) {
  var match = this.tail.match(re);

  if (!match || match.index !== 0)
    return '';

  var string = match[0];

  this.tail = this.tail.substring(string.length);
  this.pos += string.length;

  return string;
};

/**
 * Skips all text until the given regular expression can be matched. Returns
 * the skipped string, which is the entire tail if no match can be made.
 */
Scanner.prototype.scanUntil = function scanUntil (re) {
  var index = this.tail.search(re), match;

  switch (index) {
    case -1:
      match = this.tail;
      this.tail = '';
      break;
    case 0:
      match = '';
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
  }

  this.pos += match.length;

  return match;
};

/**
 * Represents a rendering context by wrapping a view object and
 * maintaining a reference to the parent context.
 */
function Context (view, parentContext) {
  this.view = view;
  this.cache = { '.': this.view };
  this.parent = parentContext;
}

/**
 * Creates a new context using the given view with this context
 * as the parent.
 */
Context.prototype.push = function push (view) {
  return new Context(view, this);
};

/**
 * Returns the value of the given name in this context, traversing
 * up the context hierarchy if the value is absent in this context's view.
 */
Context.prototype.lookup = function lookup (name) {
  var cache = this.cache;

  var value;
  if (cache.hasOwnProperty(name)) {
    value = cache[name];
  } else {
    var context = this, intermediateValue, names, index, lookupHit = false;

    while (context) {
      if (name.indexOf('.') > 0) {
        intermediateValue = context.view;
        names = name.split('.');
        index = 0;

        /**
         * Using the dot notion path in `name`, we descend through the
         * nested objects.
         *
         * To be certain that the lookup has been successful, we have to
         * check if the last object in the path actually has the property
         * we are looking for. We store the result in `lookupHit`.
         *
         * This is specially necessary for when the value has been set to
         * `undefined` and we want to avoid looking up parent contexts.
         *
         * In the case where dot notation is used, we consider the lookup
         * to be successful even if the last "object" in the path is
         * not actually an object but a primitive (e.g., a string, or an
         * integer), because it is sometimes useful to access a property
         * of an autoboxed primitive, such as the length of a string.
         **/
        while (intermediateValue != null && index < names.length) {
          if (index === names.length - 1)
            lookupHit = (
              hasProperty(intermediateValue, names[index])
              || primitiveHasOwnProperty(intermediateValue, names[index])
            );

          intermediateValue = intermediateValue[names[index++]];
        }
      } else {
        intermediateValue = context.view[name];

        /**
         * Only checking against `hasProperty`, which always returns `false` if
         * `context.view` is not an object. Deliberately omitting the check
         * against `primitiveHasOwnProperty` if dot notation is not used.
         *
         * Consider this example:
         * ```
         * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
         * ```
         *
         * If we were to check also against `primitiveHasOwnProperty`, as we do
         * in the dot notation case, then render call would return:
         *
         * "The length of a football field is 9."
         *
         * rather than the expected:
         *
         * "The length of a football field is 100 yards."
         **/
        lookupHit = hasProperty(context.view, name);
      }

      if (lookupHit) {
        value = intermediateValue;
        break;
      }

      context = context.parent;
    }

    cache[name] = value;
  }

  if (isFunction(value))
    value = value.call(this.view);

  return value;
};

/**
 * A Writer knows how to take a stream of tokens and render them to a
 * string, given a context. It also maintains a cache of templates to
 * avoid the need to parse the same template twice.
 */
function Writer () {
  this.templateCache = {
    _cache: {},
    set: function set (key, value) {
      this._cache[key] = value;
    },
    get: function get (key) {
      return this._cache[key];
    },
    clear: function clear () {
      this._cache = {};
    }
  };
}

/**
 * Clears all cached templates in this writer.
 */
Writer.prototype.clearCache = function clearCache () {
  if (typeof this.templateCache !== 'undefined') {
    this.templateCache.clear();
  }
};

/**
 * Parses and caches the given `template` according to the given `tags` or
 * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
 * that is generated from the parse.
 */
Writer.prototype.parse = function parse (template, tags) {
  var cache = this.templateCache;
  var cacheKey = template + ':' + (tags || mustache.tags).join(':');
  var isCacheEnabled = typeof cache !== 'undefined';
  var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

  if (tokens == undefined) {
    tokens = parseTemplate(template, tags);
    isCacheEnabled && cache.set(cacheKey, tokens);
  }
  return tokens;
};

/**
 * High-level method that is used to render the given `template` with
 * the given `view`.
 *
 * The optional `partials` argument may be an object that contains the
 * names and templates of partials that are used in the template. It may
 * also be a function that is used to load partial templates on the fly
 * that takes a single argument: the name of the partial.
 *
 * If the optional `config` argument is given here, then it should be an
 * object with a `tags` attribute or an `escape` attribute or both.
 * If an array is passed, then it will be interpreted the same way as
 * a `tags` attribute on a `config` object.
 *
 * The `tags` attribute of a `config` object must be an array with two
 * string values: the opening and closing tags used in the template (e.g.
 * [ "<%", "%>" ]). The default is to mustache.tags.
 *
 * The `escape` attribute of a `config` object must be a function which
 * accepts a string as input and outputs a safely escaped string.
 * If an `escape` function is not provided, then an HTML-safe string
 * escaping function is used as the default.
 */
Writer.prototype.render = function render (template, view, partials, config) {
  var tags = this.getConfigTags(config);
  var tokens = this.parse(template, tags);
  var context = (view instanceof Context) ? view : new Context(view, undefined);
  return this.renderTokens(tokens, context, partials, template, config);
};

/**
 * Low-level method that renders the given array of `tokens` using
 * the given `context` and `partials`.
 *
 * Note: The `originalTemplate` is only ever used to extract the portion
 * of the original template that was contained in a higher-order section.
 * If the template doesn't use higher-order sections, this argument may
 * be omitted.
 */
Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
  var buffer = '';

  var token, symbol, value;
  for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    value = undefined;
    token = tokens[i];
    symbol = token[0];

    if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
    else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
    else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
    else if (symbol === '&') value = this.unescapedValue(token, context);
    else if (symbol === 'name') value = this.escapedValue(token, context, config);
    else if (symbol === 'text') value = this.rawValue(token);

    if (value !== undefined)
      buffer += value;
  }

  return buffer;
};

Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
  var self = this;
  var buffer = '';
  var value = context.lookup(token[1]);

  // This function is used to render an arbitrary template
  // in the current context by higher-order sections.
  function subRender (template) {
    return self.render(template, context, partials, config);
  }

  if (!value) return;

  if (isArray(value)) {
    for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
      buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
    }
  } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
    buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
  } else if (isFunction(value)) {
    if (typeof originalTemplate !== 'string')
      throw new Error('Cannot use higher-order sections without the original template');

    // Extract the portion of the original template that the section contains.
    value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

    if (value != null)
      buffer += value;
  } else {
    buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
  }
  return buffer;
};

Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
  var value = context.lookup(token[1]);

  // Use JavaScript's definition of falsy. Include empty arrays.
  // See https://github.com/janl/mustache.js/issues/186
  if (!value || (isArray(value) && value.length === 0))
    return this.renderTokens(token[4], context, partials, originalTemplate, config);
};

Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
  var filteredIndentation = indentation.replace(/[^ \t]/g, '');
  var partialByNl = partial.split('\n');
  for (var i = 0; i < partialByNl.length; i++) {
    if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
      partialByNl[i] = filteredIndentation + partialByNl[i];
    }
  }
  return partialByNl.join('\n');
};

Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
  if (!partials) return;
  var tags = this.getConfigTags(config);

  var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
  if (value != null) {
    var lineHasNonSpace = token[6];
    var tagIndex = token[5];
    var indentation = token[4];
    var indentedValue = value;
    if (tagIndex == 0 && indentation) {
      indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
    }
    var tokens = this.parse(indentedValue, tags);
    return this.renderTokens(tokens, context, partials, indentedValue, config);
  }
};

Writer.prototype.unescapedValue = function unescapedValue (token, context) {
  var value = context.lookup(token[1]);
  if (value != null)
    return value;
};

Writer.prototype.escapedValue = function escapedValue (token, context, config) {
  var escape = this.getConfigEscape(config) || mustache.escape;
  var value = context.lookup(token[1]);
  if (value != null)
    return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
};

Writer.prototype.rawValue = function rawValue (token) {
  return token[1];
};

Writer.prototype.getConfigTags = function getConfigTags (config) {
  if (isArray(config)) {
    return config;
  }
  else if (config && typeof config === 'object') {
    return config.tags;
  }
  else {
    return undefined;
  }
};

Writer.prototype.getConfigEscape = function getConfigEscape (config) {
  if (config && typeof config === 'object' && !isArray(config)) {
    return config.escape;
  }
  else {
    return undefined;
  }
};

var mustache = {
  name: 'mustache.js',
  version: '4.2.0',
  tags: [ '{{', '}}' ],
  clearCache: undefined,
  escape: undefined,
  parse: undefined,
  render: undefined,
  Scanner: undefined,
  Context: undefined,
  Writer: undefined,
  /**
   * Allows a user to override the default caching strategy, by providing an
   * object with set, get and clear methods. This can also be used to disable
   * the cache by setting it to the literal `undefined`.
   */
  set templateCache (cache) {
    defaultWriter.templateCache = cache;
  },
  /**
   * Gets the default or overridden caching object from the default writer.
   */
  get templateCache () {
    return defaultWriter.templateCache;
  }
};

// All high-level mustache.* functions use this writer.
var defaultWriter = new Writer();

/**
 * Clears all cached templates in the default writer.
 */
mustache.clearCache = function clearCache () {
  return defaultWriter.clearCache();
};

/**
 * Parses and caches the given template in the default writer and returns the
 * array of tokens it contains. Doing this ahead of time avoids the need to
 * parse templates on the fly as they are rendered.
 */
mustache.parse = function parse (template, tags) {
  return defaultWriter.parse(template, tags);
};

/**
 * Renders the `template` with the given `view`, `partials`, and `config`
 * using the default writer.
 */
mustache.render = function render (template, view, partials, config) {
  if (typeof template !== 'string') {
    throw new TypeError('Invalid template! Template should be a "string" ' +
                        'but "' + typeStr(template) + '" was given as the first ' +
                        'argument for mustache#render(template, view, partials)');
  }

  return defaultWriter.render(template, view, partials, config);
};

// Export the escaping function so that the user may override it.
// See https://github.com/janl/mustache.js/issues/244
mustache.escape = escapeHtml;

// Export these mainly for testing, but also for advanced usage.
mustache.Scanner = Scanner;
mustache.Context = Context;
mustache.Writer = Writer;

var formaggino = new Formaggino();
formaggino.submitEvent("#form", {
  mode: "json"
});
console.log(getDocs(""));
var contents = {
  pkg: pkg,
  readme: readme
};
console.log(contents);

function render() {
  var template = document.getElementById("template").innerHTML;
  var rendered = mustache.render(template, {
    content: contents
  });
  document.getElementById("template").innerHTML = rendered;
}

render();
