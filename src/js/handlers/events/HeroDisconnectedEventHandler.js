class HeroDisconnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      console.log('Disconnected');
      setTimeout(() => {
        api.isDisconnected = true;
        api.reconnect();
      }, 20000)
    }
  }

  get handler() {
    return this._handler;
  }
}