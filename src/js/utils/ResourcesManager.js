/*
Created by Freshek on 09.10.2017
*/

class ResourcesManager {
  static get(name) {
    var url = this.getUrl(name);

    var xhr = new XMLHttpRequest(); //using XMLHR because I don't like the jquery implementation of Ajax
    xhr.open("GET", url, false);
    xhr.send(null);

    return xhr.responseText;
  }

  static getUrl(name) {
    if ($.browser && $.browser.mozilla)
      return browser.runtime.getURL(name);
    else {
      return chrome.runtime.getURL(name);
    }
  }
}