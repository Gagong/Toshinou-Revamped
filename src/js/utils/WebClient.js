/*
Created by Freshek on 21.10.2017
*/

class WebClient {
  static get(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send(null);

    return xhr.responseText;
  }
}