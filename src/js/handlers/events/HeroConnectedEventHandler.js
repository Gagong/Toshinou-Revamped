class HeroConnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      api.isDisconnected = false;
      console.log("Connected!");
    }
  }

  get handler() {
    return this._handler;
  }
}