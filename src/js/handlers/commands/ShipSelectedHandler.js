class ShipSelectedHandler {
  static get ID() {
    return 7138;
  }

  constructor() {
    this._handler = function (e, a) {
      let parsedJson = JSON.parse(e.detail);

      let ship = a.ships[parsedJson.userId];

      ship.maxHp = parsedJson[Variables.selectMaxHp];
      ship.maxShd = parsedJson[Variables.selectMaxShd];
      ship.hp = parsedJson[Variables.selectHp];
      ship.shd = parsedJson.shield;

      if (ship != null)
        a.lockedShip = ship;
    }
  }

  get handler() {
    return this._handler;
  }
}