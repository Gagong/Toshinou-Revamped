class ShipMoveHandler {
  static get ID() {
    return 17101;
  }

  constructor() {
    this._handler = function (e, a) {
      var shipMoveCmd = JSON.parse(e.detail);

      var ship = a.ships[shipMoveCmd.userId];

      if (ship != null)
        ship.setTarget(shipMoveCmd.x, shipMoveCmd.y, shipMoveCmd[Variables.moveDuration]);
    }
  }

  get handler() {
    return this._handler;
  }
}