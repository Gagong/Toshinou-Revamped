class Injector {
  static injectScriptFromResource(url) {
    var res = ResourcesManager.get(url);
    this.injectScript(res);
  }

  static injectScript(script) {
    var scriptElement = document.createElement("script");
    scriptElement.appendChild(document.createTextNode(script));
    document.body.appendChild(scriptElement);
    document.body.removeChild(scriptElement);
  }
}