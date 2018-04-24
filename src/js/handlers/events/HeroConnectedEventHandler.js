class HeroConnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      api.isDisconnected = false;
    }
  }

  get handler() {
    return this._handler;
  }
}