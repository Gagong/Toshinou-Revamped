class PalladiumInitHandler {
  static get ID() {
    return 3074;
  }

  constructor() {
    this._handler = function (e, a) {
      var box = JSON.parse(e.detail);
      if (box.hash.length == 6) {
        return;
      }

      if (a.isOnBlacklist(box.hash)) {
        return;
      }

      var pBox = new Box(box.x, box.y, box.hash, box[Variables.resource][Variables.resourceType]);
      a.boxes[box.hash] = pBox;
    };
  }

  get handler() {
    return this._handler;
  }
}