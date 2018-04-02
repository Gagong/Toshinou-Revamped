class Api {
  constructor() {
    this._blackListedBoxes = [];
    this.gates = [];
    this.boxes = {};
    this.ships = {};
    this.battlestation = null;
    this.lastMovement = 0;
    this.isDisconected = false;
  }

  lockShip(ship) {
    if (!(ship instanceof Ship))
      return;

    if (this.ships[ship.id] == null)
      return;

    ship.update();
    var pos = ship.position;
    var scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
    Injector.injectScript(scr);

    this.lockTime = $.now();
  }

  lockNpc(ship) {
    if (!(ship instanceof Ship))
      return;

    if (this.ships[ship.id] == null)
      return;

    this.lockTime = $.now();

    this.lockShip(ship);
  }

  collectBox(box) {
    if (!(box instanceof Box))
      return;

    if (this.boxes[box.hash] == null)
      return;

    if(MathUtils.random(1, 100) >= window.settings.collectionSensitivity){
      return;
    }

    Injector.injectScript('document.getElementById("preloader").collectBox' + box.hash + '()');

    this.collectTime = $.now();
  }

  move(x, y) {
    if (!isNaN(x) && !isNaN(y)) {
      window.hero.move(new Vector2D(x, y));
    }
  }

  blackListHash(hash) {
    this._blackListedBoxes.push(hash);
  }

  isOnBlacklist(hash) {
    return this._blackListedBoxes.includes(hash);
  }

  startLaserAttack() {
    Injector.injectScript('document.getElementById("preloader").laserAttack()');
  }

  findNearestBox() {
    var minDist = 100000;
    var finalBox;

    if (!window.settings.collectBoxes && !window.settings.collectMaterials)
      return {box: null, distance: minDist};

    for (var property in this.boxes) {
      var box = this.boxes[property];
      var dist = box.distanceTo(window.hero.position);
      if (dist < minDist) {
        if (window.settings.collectBoxes && !box.isResourse() && ((box.isCollectable() && window.settings.bonusbox) || ((box.isMaterial() || box.isDropRes()) && window.settings.matherials) || (box.isPalladium() && window.settings.palladium && window.settings.palladiumbox) || (box.isCargo() && window.settings.cargobox))) {
          finalBox = box;
          minDist = dist;
        }
      }
    }
    return {box: finalBox, distance: minDist};
  }

  findNearestShip() {
    var minDist = 100000;
    var finalShip;

    if (!window.settings.killNpcs)
      return {ship: null, distance: minDist};

    for (var property in this.ships) {
      var ship = this.ships[property];
      ship.update();
      var dist = ship.distanceTo(window.hero.position);

      if (dist < minDist) {
        if (ship.isNpc && window.settings.getNpc(ship.name) && !ship.isAttacked) {
          finalShip = ship;
          minDist = dist;
        }
      }
    }

    return {ship: finalShip, distance: minDist};
  }

  findNearestGate() {
    var minDist = 100000;
    var finalGate;

    this.gates.forEach(gate => {
      var dist = window.hero.distanceTo(gate.position);
      if (dist < minDist && gate.gateId != 150000450 && gate.gateId != 150000451 && gate.gateId != 150000449) {
        finalGate = gate;
        minDist = dist;
      }
    });

    return {gate: finalGate, distance: minDist};
  }

  markHeroAsDead() {
    this.heroDied = true;
    Injector.injectScript("window.heroDied = true;");
  }
}
