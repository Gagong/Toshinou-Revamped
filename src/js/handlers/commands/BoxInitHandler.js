class BoxInitHandler {
  static get ID() {
    return 32089;
  }

  constructor() {
    this._handler = function (e, a) {
      var box = JSON.parse(e.detail);
      /*console.log(box);*/
      if (box.hash.length == 7) {
        return;
      }

      if (a.isOnBlacklist(box.hash)) {
        return;
      }

      var pBox = new Box(box.x, box.y, box.hash, box[Variables.boxType]);
      a.boxes[box.hash] = pBox;
    };
  }

  get handler() {
    return this._handler;
  }
}