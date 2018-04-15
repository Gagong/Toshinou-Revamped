class GlobalSettings {
  constructor() {
    var self = this;
    chrome.storage.local.get({
      headerColor: "#191919",
      headerOpacity: "0.9",
      windowColor: "#191919",
      windowOpacity: "0.8",
      timerTick: 300,
      showRuntime: false,
      speedFormat: 'hour',
      windowsToTabs: false,
    }, items => {
      self._settings = items;
    });
  }

  get headerColor() {
    return this._settings.headerColor;
  }

  get headerOpacity() {
    return this._settings.headerOpacity;
  }

  get windowColor() {
    return this._settings.windowColor;
  }

  get windowOpacity() {
    return this._settings.windowOpacity;
  }

  get timerTick() {
    return this._settings.timerTick;
  }

  get speedFormat() {
    return this._settings.speedFormat;
  }

  get showRuntime() {
    return this._settings.showRuntime;
  }

  get windowsToTabs() {
    return this._settings.windowsToTabs;
  }
}