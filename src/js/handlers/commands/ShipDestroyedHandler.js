/*
Created by Freshek on 24.10.2017
*/

class ShipDestroyedHandler {
  static get ID() {
    return 10317;
  }

  constructor() {
    this._handler = function (e, a) {
      try {
        delete a.ships[a.targetShip.id]
        a.targetShip = null;
        a.attacking = false;
        a.triedToLock = false;
        a.lockedShip = null;
        a.lastAutoLock = null;
        window.attackWindow.hp("0");
        window.attackWindow.shd("0");
        window.attackWindow.targetName("None");
      }
      catch(e) {/*In case of it being removed already do nothing.*/}
    }
  }

  get handler() {
    return this._handler;
  }
}