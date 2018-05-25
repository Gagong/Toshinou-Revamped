class Api {
  constructor() {
    this._blackListedBoxes = [];
    this.gates = [];
    this.boxes = {};
    this.ships = {};
    this.battlestation = null;
    this.lastMovement = 0;
    this.isDisconnected = false;
    this.disconnectTime = null;
    this.reconnectTime = null;
    this.jumpTime = $.now();
    this.resetBlackListTime = $.now();
    this.blackListTimeOut = 150000;
    //this.getSettingsTime = null;
    //this.setSettingsTime = null;

    /*this.maps = { //[id, X, Y]
      1 : {X : 21000, Y : 13100}, //1-1
      2 : {X : 21000, Y : 13100}, //1-2
      3 : {X : 21000, Y : 13100}, //1-3
      4 : {X : 21000, Y : 13100}, //1-4
      13 : {X : 21000, Y : 13100}, //4-1

      5 : {X : 21000, Y : 13100}, //2-1
      6 : {X : 21000, Y : 13100}, //2-2
      7 : {X : 21000, Y : 13100}, //2-3
      8 : {X : 21000, Y : 13100}, //2-4
      14 : {X : 21000, Y : 13100}, //4-2

      9 : {X : 21000, Y : 13100}, //3-1
      10 : {X : 21000, Y : 13100}, //3-2
      11 : {X : 21000, Y : 13100}, //3-3
      12 : {X : 21000, Y : 13100}, //3-4
      15 : {X : 21000, Y : 13100}, //4-3

      16 : {X : 42000, Y : 26200}, //4-4
      29 : {X : 42000, Y : 26200}, //4-5

      17 : {X : 21000, Y : 13100}, //1-5
      18 : {X : 21000, Y : 13100}, //1-6
      19 : {X : 21000, Y : 13100}, //1-7
      20 : {X : 21000, Y : 13100}, //1-8

      21 : {X : 21000, Y : 13100}, //2-5
      22 : {X : 21000, Y : 13100}, //2-6
      23 : {X : 21000, Y : 13100}, //2-7
      24 : {X : 21000, Y : 13100}, //2-8

      25 : {X : 21000, Y : 13100}, //3-5
      26 : {X : 21000, Y : 13100}, //3-6
      27 : {X : 21000, Y : 13100}, //3-7
      28 : {X : 21000, Y : 13100}, //3-8

      91 : {X : 42000, Y : 26200}, //5-1
      92 : {X : 21000, Y : 13100}, //5-2
      93 : {X : 42000, Y : 26200}, //5-3
    };*/
  }

  lockShip(ship) {
    if (!(ship instanceof Ship))
      return;

    if (this.ships[ship.id] == null)
      return;

    ship.update();
    let pos = ship.position;
    let scr = 'document.getElementById("preloader").lockShip(' + ship.id + ',' + Math.round(pos.x) + ',' + Math.round(pos.y) + ',' + Math.round(window.hero.position.x) + ',' + Math.round(window.hero.position.y) + ');';
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

  reconnect() {
    Injector.injectScript('document.getElementById("preloader").reconnect();');
    this.reconnectTime = $.now();
  }

  collectBox(box) {
    if (!(box instanceof Box))
      return;

    if (this.boxes[box.hash] == null)
      return;

    if (MathUtils.random(1, 100) >= window.settings.collectionSensitivity) {
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

  jumpGate() {
    Injector.injectScript('document.getElementById("preloader").jumpGate();');
  }

  /*changeConfig() {
    Injector.injectScript('document.getElementById("preloader").changeConfig();');
  }*/

  resetTarget(target) {
    if (target == "enemy") {
      this.targetShip = null;
      this.attacking = false;
      this.triedToLock = false;
      this.lockedShip = null;
    } else if (target == "box") {
      this.targetBoxHash = null;
    } else if (target == "all") {
      this.targetShip = null;
      this.attacking = false;
      this.triedToLock = false;
      this.lockedShip = null;
      this.targetBoxHash = null;
    }
  }

  jumpInGG(id, settings) { //Usage: api.jumpInGG(70, window.settings.kappa);
    if (settings) {
      let gate = this.findNearestGatebyID(id);
      if (gate.gate) {
        let x = gate.gate.position.x;
        let y = gate.gate.position.y;
        if (window.hero.position.distanceTo(gate.gate.position) < 200 && this.jumpTime && $.now() - this.jumpTime > 3000) {
          this.jumpGate();
          this.jumpTime = $.now();
        }
        this.resetTarget("all");
        this.move(x, y);
        window.movementDone = false;
      }
    }
  }

  ggDeltaFix() {
    let shipsCount = Object.keys(api.ships).length;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.name == "-=[ StreuneR ]=- δ4" || 
          ship.name == "-=[ Lordakium ]=- δ9" || 
          ship.name == "-=[ Sibelon ]=- δ14" || 
          ship.name == "-=[ Kristallon ]=- δ19")) {
        if (shipsCount > 1) {
          window.settings.setNpc(ship.name, true);
          if (this.targetShip == ship)
            this.resetTarget("enemy");
        } else {
          window.settings.setNpc(ship.name, false);
          this.targetShip = ship;
        }
      } 
    }
  }

  ggZetaFix() {
    let shipsCount = Object.keys(api.ships).length;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.name == "-=[ Devourer ]=- ζ25" || ship.name == "-=[ Devourer ]=- ζ27")) {
        if (shipsCount > 1) {
          //window.settings.dontCircleWhenHpBelow25Percent = false;
          window.settings.setNpc(ship.name, true);
          if (this.targetShip == ship)
            this.resetTarget("enemy");
        } else {
          window.settings.setNpc(ship.name, false);
          this.targetShip = ship;
          //window.settings.dontCircleWhenHpBelow25Percent = true;
        }
      }
    }
  }

  findNearestBox() {
    let minDist = 100000;
    let finalBox;

    if (!window.settings.bonusBox && !window.settings.materials && !window.settings.palladium && !window.settings.cargoBox && !window.settings.greenOrGoldBooty && !window.settings.redBooty && !window.settings.blueBooty && !window.settings.masqueBooty)
      return {
        box: null,
        distance: minDist
      };

    for (let property in this.boxes) {
      let box = this.boxes[property];
      let dist = box.distanceTo(window.hero.position);
      if (dist < minDist) {
        if (!box.isResource() && ((box.isCollectable() && window.settings.bonusBox) ||
            ((box.isMaterial() || box.isDropRes()) && window.settings.materials) ||
            (box.isPalladium() && window.settings.palladium) ||
            (box.isCargoBox() && window.settings.cargoBox) ||
            (box.isGreenOrGoldBooty() && window.settings.greenOrGoldBooty && window.greenOrGoldBootyKeyCount > 0) ||
            (box.isRedBooty() && window.settings.redBooty && window.redBootyKeyCount > 0) ||
            (box.isBlueBooty() && window.settings.blueBooty && window.blueBootyKeyCount > 0) ||
            (box.isMasqueBooty() && window.settings.masqueBooty && window.masqueBootyKeyCount > 0))) {
          finalBox = box;
          minDist = dist;
        }
      }
    }
    return {
      box: finalBox,
      distance: minDist
    };
  }

  findNearestShip() {
    let minDist = 100000;
    let finalShip;

    if (!window.settings.killNpcs)
      return {
        ship: null,
        distance: minDist
      };

    for (let property in this.ships) {
      let ship = this.ships[property];
      ship.update();
      let dist = ship.distanceTo(window.hero.position);

      if (dist < minDist) {
        if (ship.isNpc && window.settings.getNpc(ship.name) && !ship.isAttacked) {
          finalShip = ship;
          minDist = dist;
        }
      }
    }

    return {
      ship: finalShip,
      distance: minDist
    };
  }

  findNearestGate() {
    let minDist = 100000;
    let finalGate;

    this.gates.forEach(gate => {
      let dist = window.hero.distanceTo(gate.position);
      if (dist < minDist && gate.gateId != 150000450 && gate.gateId != 150000451 && gate.gateId != 150000449) {
        finalGate = gate;
        minDist = dist;
      }
    });

    return {
      gate: finalGate,
      distance: minDist
    };
  }

  findNearestGateForRunAway(enemy) {
    let minDist = 100000;
    let finalGate;
    this.gates.forEach(gate => {
      let enemeyDistance = enemy.distanceTo(gate.position);
      let dist = window.hero.distanceTo(gate.position);
      if (enemeyDistance < dist) {
        return;
      }
      
      if (dist < minDist && gate.gateType != 84 && gate.gateType != 42 && gate.gateType != 43) {
        finalGate = gate;
        minDist = dist;
      }
    });

    return {
      gate: finalGate,
      distance: minDist
    };
  }

  findNearestGatebyID(gateId) {
    let minDist = 100000;
    let finalGate;

    this.gates.forEach(gate => {
      let dist = window.hero.distanceTo(gate.position);
      if (dist < minDist && gate.gateType == gateId) {
        finalGate = gate;
        minDist = dist;
      }
    });

    return {
      gate: finalGate,
      distance: minDist
    };
  }

  markHeroAsDead() {
    this.heroDied = true;
    Injector.injectScript("window.heroDied = true;");
  }

  checkForEnemy() {
    let result = {
      run: false,
      enemy: null,
      edist: 100000
    };
    let enemyDistance = 100000;
    let enemyShip;
    for (let property in this.ships) {
      let ship = this.ships[property];
      ship.update();
      if (!ship.isNpc && ship.isEnemy) {
        let dist = ship.distanceTo(window.hero.position);
        if (enemyDistance > dist) {
          enemyDistance = dist;
          result.edist = dist;
          result.enemy = ship;
        }
      }
    }
    if (enemyDistance < 2000) { // 2000 run away detect distance
      result.run = true;
      return result;
    }
    return result;
  }

}
