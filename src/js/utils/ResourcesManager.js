class ResourcesManager {
  static get(name) {
    var url = this.getUrl(name);

    var xhr = new XMLHttpRequest();
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