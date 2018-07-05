/*
Created by Freshek on 07.10.2017
*/

class BoxInitHandler {
  static get ID() {
    return 30654;
  }

  constructor() {
    this._handler = function (e, a) {
      var box = JSON.parse(e.detail);

      if (box.hash.length == 5) {
        return;
      }

      if (a.isBoxOnBlacklist(box.hash)) {
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