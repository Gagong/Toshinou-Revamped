window.globalSettings = new GlobalSettings();
window.debug = false;
var api;
var notrightId;
window.b1 = 70;
window.b2 = 87.3;
var running;

$(document).ready(function () {
  api = new Api();

  var preloader = $("#preloader").attr("wmode", "opaque");
  $("#preloader").remove();

  var check = SafetyChecker.check();

  if (check !== true) {
    var warning = jQuery("<div>");
    warning.css({
      top: 0,
      left: 0,
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "gray",
      textAlign: "center"
    });

    jQuery("<h1>").text("The tool detected changes in the game.").appendTo(warning);
    jQuery("<h2>").text("Loading stopped! Your account has to stay safe.").appendTo(warning);
    jQuery("<h3>").text("Reason: " + check).appendTo(warning);

    warning.appendTo("body");
    throw new Error("Safety tests failed!");
  }

  preloader.appendTo($("#container"));

  window.settings = new Settings();
  window.initialized = false;
  window.reviveCount = 0;
  window.count = 0;
  window.movementDone = true;

  var hm = new HandlersManager(api);

  hm.registerCommand(BoxInitHandler.ID, new BoxInitHandler());
  hm.registerCommand(PalladiumInitHandler.ID, new PalladiumInitHandler());
  hm.registerCommand(ShipAttackHandler.ID, new ShipAttackHandler());
  hm.registerCommand(ShipCreateHandler.ID, new ShipCreateHandler());
  hm.registerCommand(ShipMoveHandler.ID, new ShipMoveHandler());
  hm.registerCommand(AssetRemovedHandler.ID, new AssetRemovedHandler());
  hm.registerCommand(HeroInitHandler.ID, new HeroInitHandler(init));
  hm.registerCommand(ShipDestroyedHandler.ID, new ShipDestroyedHandler());
  hm.registerCommand(ShipRemovedHandler.ID, new ShipRemovedHandler());
  hm.registerCommand(GateInitHandler.ID, new GateInitHandler());
  hm.registerCommand(ShipSelectedHandler.ID, new ShipSelectedHandler());
  hm.registerCommand(MessagesHandler.ID, new MessagesHandler());
  hm.registerCommand(HeroDiedHandler.ID, new HeroDiedHandler());
  hm.registerCommand(HeroUpdateHitpointsHandler.ID, new HeroUpdateHitpointsHandler());
  hm.registerCommand(AssetCreatedHandler.ID, new AssetCreatedHandler());

  hm.registerEvent("updateHeroPos", new HeroPositionUpdateEventHandler());
  hm.registerEvent("movementDone", new MovementDoneEventHandler());

  hm.listen();
});

function init() {
  if (window.initialized)
    return;

  window.minimap = new Minimap(api);
  window.minimap.createWindow();

  window.attackWindow = new AttackWindow();
  window.attackWindow.createWindow();

  window.generalSettingsWindow = new GeneralSettingsWindow();
  window.generalSettingsWindow.createWindow();

  window.boxSettingsWindow = new BoxSettingsWindow();
  window.boxSettingsWindow.createWindow();

  window.GGSettingsWindow = new GGSettingsWindow();
  window.GGSettingsWindow.createWindow();

  window.autolockWindow = new AutolockWindow();
  window.autolockWindow.createWindow();

  window.npcSettingsWindow = new NpcSettingsWindow();
  window.npcSettingsWindow.createWindow();

  window.statisticWindow = new StatisticWindow();
  window.statisticWindow.createWindow();

  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, window.globalSettings.timerTick);

  $(document).keyup(function (e) {
    var key = e.key;

    if (key == "x" || key == "z") {
      var maxDist = 1000;
      var finDist = 1000000;
      var finalShip;

      for (var property in api.ships) {
        var ship = api.ships[property];
        var dist = ship.distanceTo(window.hero.position);

        if (dist < maxDist && dist < finDist && ((ship.isNpc && window.settings.lockNpc && key == "x") || (ship.isEnemy && window.settings.lockPlayers && key == "z" && !ship.isNpc))) {
          finalShip = ship;
          finDist = dist;
        }
      }

      if (finalShip != null) {
        api.lockShip(finalShip);
        if (window.settings.autoattack) {
          api.startLaserAttack();
          api.lastAttack = $.now();
          api.attacking = true;
        }
      }
    }
  });
}

function logic() {
  var collectBoxWhenCircle = false;
  var CircleBox = null;

  if (window.hero.mapId == 16 || window.hero.mapId == 29 || window.hero.mapId == 91 || window.hero.mapId == 93) {
    window.b1 = 42000 / 300;
    window.b2 = 26200 / 150;
    window.b3 = 700;
  } else {
    window.b1 = 21000 / 300;
    window.b2 = 13100 / 150;
    window.b3 = 350;
  }
  window.minimap.draw();

  if (api.isRepairing && window.hero.hp !== window.hero.maxHp) {
    return;
  } else if (api.isRepairing && window.hero.hp === window.hero.maxHp) {
    api.isRepairing = false;
  }

  if (api.heroDied && api.isDisconected) {
    if (running) {
      running = false;
    }
    return;
  }

  if (window.settings.runfromenemy && running) {
    window.dispatchEvent(new CustomEvent("logicEnd"));
    return;
  }

  if (window.settings.pause) {
    api.targetShip = null;
    api.attacking = false;
    api.triedToLock = false;
    api.lockedShip = null;
    api.targetBoxHash = null;
    return;
  }

  if (window.settings.runfromenemy) {
    var enemyresult = api.CheckForEnemy();

    if (enemyresult.run) {
      let gate = api.findNearestGateForRunAway(enemyresult.enemy);
      if (gate.gate) {
        let x = gate.gate.position.x;
        let y = gate.gate.position.y;
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        api.move(x, y);
        window.movementDone = false;
        running = true;
        setTimeout(() => {
          window.movementDone = true;
          running = false;
        }, MathUtils.random(30000, 35000));
        return;
      }
    }
  }

  // [1 - x-2; 2 - Alpha; 3 - Beta; 4 - Gamma; 5 - Delta; 70 - Kappa; 82 - Kuiper]

  if (window.settings.zeta) {
    let zetagg = api.findNearestGatebyID(54);
    if (zetagg.gate) {
      let x = zetagg.gate.position.x;
      let y = zetagg.gate.position.y;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.move(x, y);
      window.movementDone = false;
      return;
    }
  }

  if (window.settings.alpha) {
    let alphagg = api.findNearestGatebyID(2);
    if (alphagg.gate) {
      let x = alphagg.gate.position.x;
      let y = alphagg.gate.position.y;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.move(x, y);
      window.movementDone = false;
      return;
    }
  }

  if (window.settings.beta) {
    let betagg = api.findNearestGatebyID(3);
    if (betagg.gate) {
      let x = betagg.gate.position.x;
      let y = betagg.gate.position.y;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.move(x, y);
      window.movementDone = false;
      return;
    }
  }

  if (window.settings.gamma) {
    let gammagg = api.findNearestGatebyID(4);
    if (gammagg.gate) {
      let x = gammagg.gate.position.x;
      let y = gammagg.gate.position.y;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.move(x, y);
      window.movementDone = false;
      return;
    }
  }

  if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent && api.lockedShip.percentOfHp > 15) {
    let gate = api.findNearestGate();
    if (gate.gate) {
      let x = gate.gate.position.x;
      let y = gate.gate.position.y;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.isRepairing = true;
      api.move(x, y);
      window.movementDone = false;
      return;
    }
  }

  if (api.targetBoxHash == null && api.targetShip == null) {
    var box = api.findNearestBox();
    var ship = api.findNearestShip();

    if ((ship.distance > 1000 || !ship.ship) && (box.box)) {
      api.collectBox(box.box);
      api.targetBoxHash = box.box.hash;
      return;
    } else if (ship.ship && ship.distance < 1000 && window.settings.killNpcs && !ship.isAttacked && ship.ship.id != notrightId) {
      api.lockShip(ship.ship);
      api.triedToLock = true;
      api.targetShip = ship.ship;
      return;
    } else if (ship.ship && window.settings.killNpcs && !ship.isAttacked && ship.ship.id != notrightId) {
      ship.ship.update();
      if (ship.ship.modifier.length == 0 || ship.ship.modifier.activated == false) {
        api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
        api.targetShip = ship.ship;
        return;
      } else {
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
      }
    }
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      api.targetShip.update();
      if (api.targetShip.modifier.length == 0 || api.targetShip.modifier.activated == false) {
        var dist = api.targetShip.distanceTo(window.hero.position);
        if (dist < 600) {
          api.lockShip(api.targetShip);
          api.triedToLock = true;
          return;
        }
      } else {
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
      }
    }

    /*if (!api.attacking && api.lockedShip && api.lockedShip.shd +1 != api.lockedShip.maxShd) {
      notrightId = api.lockedShip.id;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      return;
    }*/

    if (!api.attacking && api.lockedShip /* && api.lockedShip.shd +1 == api.lockedShip.maxShd*/ ) {
      api.startLaserAttack();
      api.lastAttack = $.now();
      api.attacking = true;
      return;
    }
  }

  if (api.targetBoxHash && $.now() - api.collectTime > 7000) {
    let box = api.boxes[api.targetBoxHash];
    if (box && box.distanceTo(window.hero.position) > 1000) {
      api.collectTime = $.now();
    } else {
      if (box.type != ("MUCOSUM" || "PRISMATIUM" || "SCRAPIUM" || "BOLTRUM" || "AURUS_BOX" || "BIFENON" || "HYBRID_ALLOY_BOX")) {
        delete api.boxes[api.targetBoxHash];
        api.blackListHash(api.targetBoxHash);
        api.targetBoxHash = null;
      }
    }
  }

  if ((api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) ||
    ($.now() - api.lastAttack > 15000) ||
    (api.targetShip && (api.targetShip.modifier.length != 0 || api.targetShip.modifier.activated == false))) {
    api.targetShip = null;
    api.attacking = false;
    api.triedToLock = false;
    api.lockedShip = null;
  }

  var x;
  var y;

  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium) {
    x = MathUtils.random(100, 20732);
    y = MathUtils.random(58, 12830);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && window.settings.palladium) {
    x = MathUtils.random(17873, 32264);
    y = MathUtils.random(20982, 25515)
  }

  if (api.targetShip && window.settings.killNpcs && api.targetBoxHash == null) {
    api.targetShip.update();
    var dist = api.targetShip.distanceTo(window.hero.position);

    if ((dist > 600 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id) && $.now() - api.lastMovement > 1000)) {
      x = api.targetShip.position.x - MathUtils.random(-50, 50);
      y = api.targetShip.position.y - MathUtils.random(-50, 50);
      api.lastMovement = $.now();
    } else if (api.lockedShip && api.lockedShip.percentOfHp < 20 && api.lockedShip.id == api.targetShip.id && window.settings.dontCircleWhenHpBelow15Percent) {
      if (dist > 450) {
        x = api.targetShip.position.x + MathUtils.random(-30, 30);
        y = api.targetShip.position.y + MathUtils.random(-30, 30);
      }
    } else if (dist > 300 && api.lockedShip && api.lockedShip.id == api.targetShip.id & !window.settings.circleNpc) {
      x = api.targetShip.position.x + MathUtils.random(-200, 200);
      y = api.targetShip.position.y + MathUtils.random(-200, 200);
    } else if (api.lockedShip && api.lockedShip.id == api.targetShip.id) {
      if (window.settings.circleNpc) {
        let enemy = api.targetShip.position;
        let f = Math.atan2(window.hero.position.x - enemy.x, window.hero.position.y - enemy.y) + 0.5;
        let s = Math.PI / 180;
        f += s;
        x = enemy.x + window.settings.npcCircleRadius * Math.sin(f);
        y = enemy.y + window.settings.npcCircleRadius * Math.cos(f);
        let nearestBox = api.findNearestBox();
        if (nearestBox && nearestBox.box && nearestBox.distance < 300) {
          CircleBox = nearestBox;
          collectBoxWhenCircle = true;
        }
      }
    } else {
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
    }
  }

  if (x && y) {
    api.move(x, y);
    if (collectBoxWhenCircle && CircleBox) {
      api.collectBox(CircleBox.box);
      api.targetBoxHash = CircleBox.box.hash;
      collectBoxWhenCircle = false;
      CircleBox = null;
    }
    window.movementDone = false;
  }

  window.dispatchEvent(new CustomEvent("logicEnd"));
}