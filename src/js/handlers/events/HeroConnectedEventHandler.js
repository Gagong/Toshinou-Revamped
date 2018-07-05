class HeroConnectedEventHandler {
    constructor() {
      this._handler = function (e) {
        api.isDisconnected = false;
        console.log(`Connected at ${$.now()}`);
      }
    }
  
    get handler() {
      return this._handler;
    }
  }