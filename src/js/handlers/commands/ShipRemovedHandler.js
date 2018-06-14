class ShipRemovedHandler {
  static get ID() {
    return 719;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsed = JSON.parse(e.detail);
      let id = parsed.userId;

      if (a.targetShip && id == a.targetShip.id) {
        a.resetTarget("enemy");
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