class ShipAttackHandler {
    static get ID() {
      return 10120;
    }
  
    constructor() {
      this._handler = function (e, a) {
        let shipAttackCmd = JSON.parse(e.detail);
  
        let attackerId = shipAttackCmd[Variables.attackerId];
        let attackedShipId = shipAttackCmd[Variables.attackedId];
  
        let ship = a.ships[attackedShipId];
  
        try {
          if (attackedShipId != window.hero.id && ship.isNpc && attackerId != window.hero.id && attackerId != window.pet.id && a.lockedShip != attackedShipId && !a.isShipOnBlacklist(attackedShipId)) {
            a.blackListId(attackedShipId);
          }
        } catch(e) {}

      }
    }
  
    get handler() {
      return this._handler;
    }
  }