class ResourceInitHandler {
  static get ID() {
    return 11579;
  }

  constructor() {
    this._handler = function (e, a) {
      let box = JSON.parse(e.detail);

      if (box.hash.length == 6) {
        return;
      }

      if (a.isOnBlacklist(box.hash)) {
        return;
      }

      let pBox = new Box(box.x, box.y, box.hash, box[Variables.resource][Variables.resourceType]);
      a.boxes[box.hash] = pBox;
    };
  }

  get handler() {
    return this._handler;
  }
}