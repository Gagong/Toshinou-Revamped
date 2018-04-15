class AssetRemovedHandler {
  static get ID() {
    return 15882;
  }

  constructor() {
    this._handler = function (e, a) {
      var parsedCmd = JSON.parse(e.detail);
      /*console.log(parsedCmd);*/

      if (parsedCmd.hash == a.targetBoxHash) {
        a.targetBoxHash = null;
      }

      if (a.boxes.hasOwnProperty(parsedCmd.hash)) {
        delete a.boxes[parsedCmd.hash];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}