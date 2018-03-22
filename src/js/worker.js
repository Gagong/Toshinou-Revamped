/*
Created by Freshek on 07.10.2017
*/
window.globalSettings = new GlobalSettings();
window.debug = false;
var api;

$(document).ready(function() {
  api = new Api();

  var preloader = $("#preloader").attr("wmode", "opaque");
  $("#preloader").remove();

  var check = SafetyChecker.check();

  if (check !== true) {
    var warning = jQuery("<div>");
    warning.css({top: 0, left: 0, position: "absolute", width: "100%", height: "100%", backgroundColor: "gray", textAlign: "center"});

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

  window.movementDone = true;

  var hm = new HandlersManager(api);

  hm.registerCommand(BoxInitHandler.ID, new BoxInitHandler());
  hm.registerCommand(ResourseBoxInitHandler.ID, new ResourseBoxInitHandler());
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

  window.autolockWindow = new AutolockWindow();
  window.autolockWindow.createWindow();

  window.npcSettingsWindow = new NpcSettingsWindow();
  window.npcSettingsWindow.createWindow();

  window.statisticWindow = new StatisticWindow();
  window.statisticWindow.createWindow();

  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, window.globalSettings.timerTick);

  $(document).keyup(function(e) {
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

      if (finalShip != null)
        api.lockShip(finalShip);
    }
  });
}

function logic() {
  if (window.settings.useGGAlgorithm) {
    ggLogic();
    return;
  }
  if (api.isRepairing && window.hero.hp !== window.hero.maxHp) {
    return;
  } else if (api.isRepairing && window.hero.hp === window.hero.maxHp) {
    api.isRepairing = false;
  }

  if (api.heroDied && api.isDisconected)
    return;

  window.minimap.draw();

  if (api.targetBoxHash == null && api.targetShip == null) {
    if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent) {
      let gate = api.findNearestGate();
      if (gate.gate) {
        let x = gate.gate.position.x;
        let y = gate.gate.position.y;
        api.isRepairing = true;
        api.move(x, y);
        window.movementDone = false;
        return;
      }
    }

    var box = api.findNearestBox();
    var ship = api.findNearestShip();

    if ((ship.distance > 1000 || !ship.ship) && (box.box)) {
      api.collectBox(box.box);
      api.targetBoxHash = box.box.hash;
      return;
    } else if (ship.ship && ship.distance < 1000 && window.settings.killNpcs && !ship.isAttacked) {
      api.lockShip(ship.ship);
      api.triedToLock = true;
      api.targetShip = ship.ship;
      return;
    } else if (ship.ship && window.settings.killNpcs && !ship.isAttacked) {
      ship.ship.update();
      api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
        api.targetShip = ship.ship;
      return;
    }
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      api.targetShip.update();
      var dist = api.targetShip.distanceTo(window.hero.position);
      if (dist < 600) {
        api.lockShip(api.targetShip);
        api.triedToLock = true;
        return;
      }
    }

    if (!api.attacking && api.lockedShip) {
      api.startLaserAttack();
      api.lastAttack = $.now();
      api.attacking = true;
      return;
    }
  }

  if (api.targetBoxHash && $.now() - api.collectTime > 5000) {
    let box = api.boxes[api.targetBoxHash];
    if (box && box.distanceTo(window.hero.position) > 1000) {
      api.collectTime = $.now();
    } else {
      delete api.boxes[api.targetBoxHash];
      api.blackListHash(api.targetBoxHash);
      api.targetBoxHash = null;
    }
  }

  if ((api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) || $.now() - api.lastAttack > 2000) {
    api.targetShip = null;
    api.attacking = false;
    api.triedToLock = false;
    api.lockedShip = null;
  }

  var x;
  var y;

  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly) {
    x = MathUtils.random(100, 20732);
    y = MathUtils.random(58, 12830);
  }

  if (api.targetShip && window.settings.killNpcs && api.targetBoxHash == null) {
    api.targetShip.update();
    var dist = api.targetShip.distanceTo(window.hero.position);

    if ((dist > 600 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id) && $.now() - api.lastMovement > 1000)) {
      x = api.targetShip.position.x - MathUtils.random(-50, 50);
      y = api.targetShip.position.y - MathUtils.random(-50, 50);
      api.lastMovement = $.now();
    } else if (api.lockedShip && api.lockedShip.percentOfHp < 15 && api.lockedShip.id == api.targetShip.id && window.settings.dontCircleWhenHpBelow15Percent) {
      if (dist > 450) {
        x = api.targetShip.position.x + MathUtils.random(-30, 30);
        y = api.targetShip.position.y + MathUtils.random(-30, 30);
      }
    } else if (dist > 300 && api.lockedShip && api.lockedShip.id == api.targetShip.id & !window.settings.circleNpc) {
      x = api.targetShip.position.x + MathUtils.random(-200, 200);
      y = api.targetShip.position.y + MathUtils.random(-200, 200);
    } else if (api.lockedShip && api.lockedShip.id == api.targetShip.id) {
      if (window.settings.circleNpc) {
        //I'm not completely sure about this algorithm
        let enemy = api.targetShip.position;
        let f = Math.atan2(window.hero.position.x - enemy.x, window.hero.position.y - enemy.y) + 0.5;
        let s = Math.PI / 180;
        f += s;
        x = enemy.x + window.settings.npcCircleRadius * Math.sin(f);
        y = enemy.y + window.settings.npcCircleRadius * Math.cos(f);
      }
    } else { // ??? there must be something wrong with our locked npc
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
    }
  }

  if (x && y) {
    api.move(x, y);
    window.movementDone = false;
  }

  window.dispatchEvent(new CustomEvent("logicEnd"));
}

let ggSpeed = 150;
let standardLogic = false;
let lastAngle;

function ggLogic() {
  if (api.targetShip == null) {
    let ship = api.findNearestGGShip(false);
    if (ship.ship) {
      api.targetShip = ship.ship;
      standardLogic = false;
    } else {
      ship = api.findNearestGGShip(true);
      if (ship.ship) {
        api.targetShip = ship.ship;
        standardLogic = true;
      }
    }
    return;
  } else if (api.targetShip.percentOfHp < 20 && !standardLogic) {
    api.targetShip = null;
    api.attacking = false;
    api.triedToLock = false;
    api.lockedShip = null;
    return;
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      api.targetShip.update();
      let dist = api.targetShip.distanceTo(window.hero.position);
      if (dist < 1000) {
        api.lockShip(api.targetShip);
        api.triedToLock = true;
        return;
      }
    }

    if (!api.attacking && api.lockedShip) {
      api.startLaserAttack();
      api.lastAttack = $.now();
      api.attacking = true;
      return;
    }
  }

  let x, y;

  let mapCenter = {
    x: 20732 / 2,
    y: 12830 / 2,
  };

  if (!standardLogic) {
    api.targetShip.update();
    window.enemyAngle = window.enemyAngle ? window.enemyAngle : 0;
    let DISTANSE = window.settings.npcCircleRadius;

    let maxRadius = mapCenter.y - 100;
    let minRadius = 1000;

    let radius = mapCenter.y - 10;

    if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent && ggSpeed < 300) {
      ggSpeed++;
    } else {
      let dist = api.targetShip.distanceTo(window.hero.position);
      if (dist > 7000) {
        return;
      } else if (api.targetShip && dist > DISTANSE && ggSpeed > 50) {
        ggSpeed--;
      } else if (api.targetShip < DISTANSE && ggSpeed < 300) {
        ggSpeed++;
      }
    }

    let coefficient = ggSpeed / radius;
    window.enemyAngle += coefficient;

    let f =  Math.atan2(mapCenter.y - window.hero.position.y, mapCenter.x - window.hero.position.x) + window.enemyAngle;

    x = mapCenter.x + radius * Math.sin(f);
    y = mapCenter.y + radius * Math.cos(f);
  } else {
    // y.........................x
    // ...........................
    // .............+.............
    // ...........................
    // x.........................y

    let lastPos = api.targetShip.position;
    api.targetShip.update();
    let currentPos = api.targetShip.position;

    let dx = Math.abs(currentPos.x - lastPos.x);
    let dy = Math.abs(currentPos.y - lastPos.y);

    if (dx != 0 && dy != 0) {
      let rad = Math.atan2(dx, dy);
      let opposite = rad + Math.PI / 180;
      lastAngle = opposite;
    }

    if (lastAngle) {
      x = currentPos.x + (window.settings.npcCircleRadius * Math.cos(lastAngle));
      y = currentPos.y + (window.settings.npcCircleRadius * Math.sin(lastAngle));
    } else {
      let a = Math.sqrt((window.settings.npcCircleRadius ^ 2) / 2);

      if (currentPos.x > mapCenter.x) {
        x = currentPos.x - a;
        y = currentPos.y - a;
      } else {
        x = currentPos.x + a;
        y = currentPos.y + a;
      }
    }
  }

  window.dispatchEvent(new CustomEvent("logicEnd"));

  api.move(x, y);
}
