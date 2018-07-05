/*
Created by Freshek on 24.10.2017
*/

class ShipRemovedHandler {
  static get ID() {
    return 25543;
  }

  constructor() {
    this._handler = function (e, a) {
      var parsed = JSON.parse(e.detail);
      var id = parsed.userId;

      if (a.targetShip && id == a.targetShip.id || a.lockedShip && id == a.lockedShip.id) {
        a.targetShip = null;
        a.attacking = false;
        a.triedToLock = false;
        a.lockedShip = null;
        a.lastAutoLock = null;
        window.attackWindow.hp("0");
        window.attackWindow.shd("0");
        window.attackWindow.targetName("None");
      }

      var ship = a.ships[id];

      if (ship != null) {
        delete a.ships[id];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}