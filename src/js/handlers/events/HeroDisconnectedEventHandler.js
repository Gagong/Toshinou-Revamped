class HeroDisconnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      console.log('Disconnected');
      api.isDisconnected = true;
      api.disconnectTime = $.now();
    }
  }

  get handler() {
    return this._handler;
  }
}