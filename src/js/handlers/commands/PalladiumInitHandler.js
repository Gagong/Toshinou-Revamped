class PalladiumInitHandler {
  static get ID() {
    return 11042;
  }

  constructor() {
    this._handler = function (e, a) {
      var box = JSON.parse(e.detail);
      /*console.log(box);*/
      if (box.hash.length == 6) {
        return;
      }

      if (a.isOnBlacklist(box.hash)) {
        return;
      }

      var pBox = new Box(box.x, box.y, box.hash, box[Variables.PalladiumType][Variables.PType]);
      a.boxes[box.hash] = pBox;
    };
  }

  get handler() {
    return this._handler;
  }
}