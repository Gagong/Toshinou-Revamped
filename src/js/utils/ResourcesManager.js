class ResourcesManager {
  static get(name) {
    let url = this.getUrl(name);

    let xhr = new XMLHttpRequest();
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