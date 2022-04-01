import { LIB_NAME, LIB_VERSION } from './constants';

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
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(body);
    }
    var myHeaders = new Headers();
    Object.keys(headers).forEach((key) => myHeaders.append(key, headers[key]));
    return {
      method: method ? method : 'POST',
      headers: myHeaders,
      body
    };
  }
}

export default Formaggino;
