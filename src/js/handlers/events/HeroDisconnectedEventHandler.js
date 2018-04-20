class HeroDisconnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      api.isDisconnected = true;
      api.disconnectTime = $.now();
    }
  }

  get handler() {
    return this._handler;
  }
}