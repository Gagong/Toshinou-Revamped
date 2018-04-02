class GameVersionUpdateEventHandler {
  constructor() {
    this._handler = function(e) {
      var gamever = e.detail;
      if (gamever) {
        console.log(gamever);
      }
      else {
        console.log("Null");
      }
    }
  }

  get handler() {
    return this._handler;
  }
}
