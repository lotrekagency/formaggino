class Requests {
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
}

export default Requests;
