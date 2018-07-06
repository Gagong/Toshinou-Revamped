class Injector {
  static injectScriptFromResource(url) {
    let res = ResourcesManager.get(url);
    this.injectScript(res);
  }

  static injectScript(script) {
    let scriptElement = document.createElement("script");
    scriptElement.appendChild(document.createTextNode(script));
    document.body.appendChild(scriptElement);
    document.body.removeChild(scriptElement);
  }
}