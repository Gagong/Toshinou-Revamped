class HeroConnectedEventHandler {
  constructor() {
    this._handler = function (e) {
      console.log('Connected!');
      api.isDisconnected = false;

    }
  }

  get handler() {
    return this._handler;
  }
}