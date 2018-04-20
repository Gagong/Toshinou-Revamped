class WebClient {
  static get(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);

    return xhr.responseText;
  }
}