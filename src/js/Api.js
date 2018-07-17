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
    this.blackListTimeOut = 150000
    this.getSettingsTime = $.now();
    this.setSettingsTime = $.now();
    this.rute = null;
    this.starSystem = [];
    this.workmap = null;
    this.statustravelsystem = false;
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

  getSettings() {
    for (let key in window.settings) {
      chrome.storage.sync.get(key, function(set) {
        window.newSettings[key] = set[key];
      })
    }
    this.getSettingsTime = $.now();
  }

  setSettings() {
    chrome.storage.sync.set(window.settings);
    this.setSettingsTime = $.now();
  }

  updateSettings() {
    window.settings = window.newSettings;
  }

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
      let gate = this.findNearestGatebyGateType(id);
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

  jumpInGateByID(gateId){
    let hasJumped = false;
    let gate = this.findGatebyID(gateId);
    if (gate.gate) {
      let x = gate.gate.position.x + MathUtils.random(-100, 100);
      let y = gate.gate.position.y + MathUtils.random(-100, 100);
      if (window.hero.position.distanceTo(gate.gate.position) < 200 && this.jumpTime && $.now() - this.jumpTime > 3000) {
        this.jumpGate();
        this.jumpTime = $.now();
         hasJumped = true;
      }
      this.resetTarget("all");
      this.move(x, y);
      window.movementDone = false;
    }
    return hasJumped;
  }

  jumpAndGoBack(gateId){
    let hasJumped = this.jumpInGateByID(gateId);
    if (window.settings.workmap != null) {
      this.workmap = window.settings.workmap;
    } else {
      this.workmap = window.hero.mapId;
    }
    if(hasJumped) {
      this.statustravelsystem = window.settings.travelsystem;
      window.settings.travelsystem = true;
      setTimeout(() => {
        window.settings.travelsystem = this.statustravelsystem;
      }, MathUtils.random(1200000, 1500000));
    }
    return hasJumped;
  }

  ggDeltaFix() {
    let shipsCount = Object.keys(this.ships).length;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.name == "-=[ StreuneR ]=- δ4" || 
        ship.name == "-=[ Lordakium ]=- δ9" || 
        ship.name == "-=[ Sibelon ]=- δ14" || 
        ship.name == "-=[ Kristallon ]=- δ19")) {
        window.settings.resetTargetWhenHpBelow25Percent=false;
        if (shipsCount > 1) {
          window.settings.setNpc(ship.name, true);
          if (this.targetShip == ship){
            this.resetTarget("enemy");
          }
        } else {
          window.settings.setNpc(ship.name, false);
          this.targetShip = ship;
        }
      }
    }
  }

  ggZetaFix() {
    let shipsCount = Object.keys(this.ships).length;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.name == "-=[ Devourer ]=- ζ25" || ship.name == "-=[ Devourer ]=- ζ27")) {
        window.settings.resetTargetWhenHpBelow25Percent=false;
        if (shipsCount > 1) {
          window.settings.setNpc(ship.name, true);
          if (this.targetShip == ship) {
            this.resetTarget("enemy");
          }
        } else {
          window.settings.setNpc(ship.name, false);
          this.targetShip = ship;
        }
      }
    }
  }

  battlerayFix() {
    let shipsCount = this.countNpcAroundByType("-=[ Interceptor ]=-", 600);
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.name == "-=[ Battleray ]=-") && ship.distanceTo(window.hero.position) < 700) {
        if (shipsCount > 1 && !ship.isAttacked) {
          window.settings.setNpc(ship.name, true);
          if (this.targetShip == ship){
            this.resetTarget("enemy");
          }
        } else {
          window.settings.setNpc(ship.name, false);
          this.targetShip = ship;
        }
      }
    }
  }

  countNpcAroundByType(type, distance){
    let shipsCount = Object.keys(this.ships).length;
    let shipsAround = 0;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && (ship.distanceTo(window.hero.position) < distance) && (ship.name == type)) {
        shipsAround++;
      }
    }
    return shipsAround;
  }

  ggCountNpcAround(distance){
    let shipsCount = Object.keys(this.ships).length;
    let shipsAround = 0;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if (ship && ship.distanceTo(window.hero.position) < distance) {
        shipsAround++;
      }
    }
    return shipsAround;
  }

  allNPCInCorner(){
    let shipsCount = Object.keys(this.ships).length;
    let shipsInCorner = 0;
    for (let property in this.ships) {
      let ship = this.ships[property];
      if((ship.position.x == 20999 && ship.position.y == 13499) || (ship.position.x == 0 && ship.position.y == 0)) {
        shipsInCorner++;
      }
    }
    
    if(shipsInCorner == shipsCount){
      return true;
    }else{
      return false;
    }
  }

   findNearestBox() {
    let minDist = 100000;
    let finalBox;

    if (!window.settings.bonusBox && !window.settings.materials && !window.settings.palladium && !window.settings.cargoBox && !window.settings.greenOrGoldBooty && !window.settings.redBooty && !window.settings.blueBooty && !window.settings.masqueBooty) {
      return {
        box: null,
        distance: minDist
      };
    }

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
    let minDist = window.settings.palladium ? window.settings.npcCircleRadius : 100000;
    let finalShip;

    if (!window.settings.killNpcs) {
      return {
        ship: null,
        distance: minDist
      };
    }

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
      if (dist < minDist) {
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
      
      if (dist < minDist) {
        finalGate = gate;
        minDist = dist;
      }
    });

    return {
      gate: finalGate,
      distance: minDist
    };
  }

  findNearestGatebyGateType(gateId) {
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

  checkForCBS(){
    let result = {
      walkAway: false,
      cbsPos: null,
    };
    result.cbsPos = this.battlestation.position;
    let dist = this.battlestation.distanceTo(window.hero.position);
    if(dist < 1500){
      result.walkAway = true;
    }
    return result;
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
    if (enemyDistance < 2000) {
      result.run = true;
      return result;
    }
    return result;
  }

  findGatebyID(gateId) {
    let finalGate;

    this.gates.forEach(gate => {
      if (gate.gateId == gateId) {
        finalGate = gate;
      }
    });

    return {
      gate: finalGate,
    };
  }

  goToMap(idWorkMap){
    if(this.rute == null){
        this.fillStarSystem();
        let mapSystem = {1:{2:1},2:{1:1,3:1,4:1},3:{2:1,7:1,4:1},4:{2:1,3:1,13:2,13:1},13:{4:1,14:2,15:2,16:2},5:{6:1},6:{5:1,7:1,8:1},7:{6:1,3:1,8:1},8:{6:1,7:1,14:2,11:1},14:{8:1,13:2,15:2,16:2},9:{10:1},10:{9:1,12:1,11:1},
        11:{10:1,8:1,12:1},12:{10:1,11:1,15:2,4:1},15:{12:1,14:2,13:2,16:2},16:{13:2,14:2,15:2,17:1,21:1,25:1},29:{17:1,21:1,25:1},17:{16:2,29:3,19:1,18:1},18:{17:1,20:1},19:{17:1,20:1},20:{18:1,19:1},21:{16:2,29:3,22:1,23:1},22:{21:1,24:1},23:{21:1,24:1},24:{23:1,22:1},25:{29:3,16:2,27:1,26:1},27:{25:1,28:1},26:{25:1,28:1},28:{26:1,27:1}},
        graph = new Graph(mapSystem);
        let imcompleteRute = graph.findShortestPath(window.hero.mapId, idWorkMap);
        this.rute = this.completeRute(imcompleteRute);
    }else{
        let map = this.rute[0];
        let portal = map.portals[0];
        if(window.hero.mapId == map.mapId){
          this.jumpInGateByID(portal.gateId);
        }
        if(window.hero.mapId == portal.idLinkedMap){
            this.rute.shift(); 
        }
    }
  }

  fillStarSystem(){
     this.starSystem = [];
     let portals11 = [];
     portals11.push(new Portal(150000156,2));
     this.starSystem.push(new Map(1, portals11));
     let portals12 = [];
     portals12.push(new Portal(150000157,1));
     portals12.push(new Portal(150000158,3));
     portals12.push(new Portal(150000160,4));
     this.starSystem.push(new Map(2, portals12));
     let portals13 = [];
     portals13.push(new Portal(150000159,2));
     portals13.push(new Portal(150000182,4));
     portals13.push(new Portal(150000162,7));
     this.starSystem.push(new Map(3, portals13));
     let portals14 = [];
     portals14.push(new Portal(150000161,2));
     portals14.push(new Portal(150000183,3));
     portals14.push(new Portal(150000186,13));
     portals14.push(new Portal(150000166,12));
     this.starSystem.push(new Map(4, portals14));
     let portals21 = [];
     portals21.push(new Portal(150000171,6)); //2-1 | 2-2
     this.starSystem.push(new Map(5, portals21));
     let portals22 = [];
     portals22.push(new Portal(150000165,7)); //2-2 | 2-3
     portals22.push(new Portal(150000172,8)); //2-2 | 2-4
     portals22.push(new Portal(150000170,5)); //2-2 | 2-4
     this.starSystem.push(new Map(6, portals22));
     let portals23 = [];
     portals23.push(new Portal(150000163,3)); //2-3 | 1-3
     portals23.push(new Portal(150000180,8)); //2-3 | 2-4
     portals23.push(new Portal(150000164,6)); //2-3 | 2-2
     this.starSystem.push(new Map(7, portals23));
     let portals24 = [];
     portals24.push(new Portal(150000181,7)); //2-4 | 2-3
     portals24.push(new Portal(150000188,14)); //2-4 | 4-2
     portals24.push(new Portal(150000173,6)); //2-4 | 2-2
     portals24.push(new Portal(150000174,11)); //2-4 | 3-3
     this.starSystem.push(new Map(7, portals24));
     let portals31 = [];
     portals31.push(new Portal(150000179,10)); //3-1 | 3-2
     this.starSystem.push(new Map(9, portals31));
     let portals32 = [];
     portals32.push(new Portal(150000177,11)); //3-2 | 3-3
     portals32.push(new Portal(150000169,12)); //3-2 | 3-4
     portals32.push(new Portal(150000178,9)); //3-2 | 3-1
     this.starSystem.push(new Map(10, portals32));
     let portals33 = [];
     portals33.push(new Portal(150000175,8)); //3-3 | 2-4
     portals33.push(new Portal(150000185,12)); //3-3 | 3-4
     portals33.push(new Portal(150000176,10)); //3-3 | 3-2
     this.starSystem.push(new Map(11, portals33));
     let portals34 = [];
     portals34.push(new Portal(150000167,4));
     portals34.push(new Portal(150000190,15));
     portals34.push(new Portal(150000184,11));
     portals34.push(new Portal(150000168,10));
     this.starSystem.push(new Map(12, portals34));
     let portals43 = [];
     portals43.push(new Portal(150000191,12)); //4-3 | 3-4
     portals43.push(new Portal(150000195,14)); //4-3 | 4-2
     portals43.push(new Portal(150000196,13)); //4-3 | 4-1
     portals43.push(new Portal(150000278,16)); //4-3 | 4-4
     this.starSystem.push(new Map(15, portals43));
     let portals41 = [];
     portals41.push(new Portal(150000187,4)); //4-1 | 1-4
     portals41.push(new Portal(150000192,14)); //4-1 | 4-2
     portals41.push(new Portal(150000197,15)); //4-1 | 4-3
     portals41.push(new Portal(150000274,16)); //4-1 | 4-4
     this.starSystem.push(new Map(13, portals41));
     let portals42 = [];
     portals42.push(new Portal(150000189,8)); //4-2 | 2-4
     portals42.push(new Portal(150000193,13)); //4-2 | 4-1
     portals42.push(new Portal(150000194,15)); //4-2 | 4-3
     portals42.push(new Portal(150000276,16)); //4-2 | 4-4
     this.starSystem.push(new Map(14, portals42));
     let portals44 = [];
     portals44.push(new Portal(150000303,25)); //4-4 | 3-5
     portals44.push(new Portal(150000279,15)); //4-4 | 4-3
     portals44.push(new Portal(150000277,14)); //4-4 | 4-2
     portals44.push(new Portal(150000293,21)); //4-4 | 2-5
     portals44.push(new Portal(150000283,17)); //4-4 | 1-5
     portals44.push(new Portal(150000275,13)); //4-4 | 4-1
     this.starSystem.push(new Map(16, portals44));
     let portals45 = [];
     portals45.push(new Portal(150000314,17)); //4-5 | 1-5
     portals45.push(new Portal(150000316,21)); //4-5 | 2-5
     portals45.push(new Portal(150000318,25)); //4-5 | 3-5
     this.starSystem.push(new Map(29, portals45));
     let portals15 = [];
     portals15.push(new Portal(150000284,16)); //1-5 | 4-4
     portals15.push(new Portal(150000313,29)); //1-5 | 4-5
     portals15.push(new Portal(150000285,18)); //1-5 | 1-6
     portals15.push(new Portal(150000287,19)); //1-5 | 1-7
     this.starSystem.push(new Map(17, portals15));
     let portals16 = [];
     portals16.push(new Portal(150000286,17)); //1-6 | 1-5
     portals16.push(new Portal(150000289,20)); //1-6 | 1-8
     this.starSystem.push(new Map(18, portals16));
     let portals17 = [];
     portals17.push(new Portal(150000291,20)); //1-7 | 1-8
     portals17.push(new Portal(150000288,17)); //1-7 | 1-5
     this.starSystem.push(new Map(19, portals17));
     let portals18 = [];
     portals18.push(new Portal(150000290,18)); //1-8 | 1-6
     portals18.push(new Portal(150000292,19)); //1-8 | 1-7
     this.starSystem.push(new Map(20, portals18));
     let portals25 = [];
     portals25.push(new Portal(150000294,16)); //2-5 | 4-4
     portals25.push(new Portal(150000315,29)); //2-5 | 4-5
     portals25.push(new Portal(150000295,22)); //2-5 | 2-6
     portals25.push(new Portal(150000297,23)); //2-5 | 2-7
     this.starSystem.push(new Map(21, portals25));
     let portals26 = [];
     portals26.push(new Portal(150000296,21)); //2-6 | 2-5
     portals26.push(new Portal(150000299,24)); //2-6 | 2-8
     this.starSystem.push(new Map(22, portals26));
     let portals27 = [];
     portals27.push(new Portal(150000298,21)); //2-7 | 2-5
     portals27.push(new Portal(150000301,24)); //2-7 | 2-8
     this.starSystem.push(new Map(23, portals27));
     let portals28 = [];
     portals28.push(new Portal(150000300,22)); //2-8 | 2-6
     portals28.push(new Portal(150000302,23)); //2-8 | 2-7
     this.starSystem.push(new Map(24, portals28));
     let portals35 = [];
     portals35.push(new Portal(150000304,16)); //3-5 | 4-4
     portals35.push(new Portal(150000317,29)); //3-5 | 4-5
     portals35.push(new Portal(150000305,26)); //3-5 | 3-6
     portals35.push(new Portal(150000307,28)); //3-5 | 3-7
     this.starSystem.push(new Map(25, portals35));
     let portals36 = [];
     portals36.push(new Portal(150000306,25)); //3-6 | 3-5
     portals36.push(new Portal(150000309,28)); //3-6 | 3-8
     this.starSystem.push(new Map(26, portals36));
     let portals37 = [];
     portals37.push(new Portal(150000308,25)); //3-7 | 3-5
     portals37.push(new Portal(150000311,28)); //3-7 | 3-8
     this.starSystem.push(new Map(27, portals37));
     let portals38 = [];
     portals38.push(new Portal(150000312,27)); //3-8 | 3-7
     portals38.push(new Portal(150000310,26)); //3-8 | 3-6
     this.starSystem.push(new Map(24, portals38));
  }

  completeRute(imcompleteRute){
      let rute = [];
      for(let i = 0;i < imcompleteRute.length; i++){
          let idWorkMap = imcompleteRute[i];
          let nextMap = imcompleteRute[i + 1];
          for(let e = 0;e < this.starSystem.length;e++){
              if(this.starSystem[e].mapId == idWorkMap){
                  let map = this.starSystem[e];
                  let portalschosen = this.returnANextPortal(map.portals,nextMap);
                  let arrayPortals = [];
                  arrayPortals.push(portalschosen);
                  rute.push(new Map(map.mapId,arrayPortals));
              }
          }
      }
      return rute;
  }

  returnANextPortal(portals,idGoMap){
    for(let i = 0;i < portals.length; i++){
      if(portals[i].idLinkedMap == idGoMap){
        return portals[i];
      }
    }
  }

}