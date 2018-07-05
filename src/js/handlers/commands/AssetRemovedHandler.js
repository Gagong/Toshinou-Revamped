class AssetRemovedHandler {
  static get ID() {
    return 3339;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsedCmd = JSON.parse(e.detail);

      if (parsedCmd.hash == a.targetBoxHash) {
        a.resetTarget("box");
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