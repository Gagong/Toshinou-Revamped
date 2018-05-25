class ShipDestroyedHandler {
  static get ID() {
    return 30265;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsed = JSON.parse(e.detail);
      let id = parsed[Variables.shipDestoyedId];

      if (a.targetShip && id == a.targetShip.id) {
        a.targetShip = null;
        a.attacking = false;
        a.triedToLock = false;
        a.lockedShip = null;
      }

      let ship = a.ships[id];

      if (ship != null) {
        delete a.ships[id];
      }
    }
  }

  get handler() {
    return this._handler;
  }
}