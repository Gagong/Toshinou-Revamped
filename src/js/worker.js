window.globalSettings = new GlobalSettings();
window.debug = false;
let api;
let notrightId;

$(document).ready(function () {
  api = new Api();

  let preloader = $("#preloader").attr("wmode", "opaque");
  $("#preloader").remove();

  let check = SafetyChecker.check();

  if (check !== true) {
    let warning = jQuery("<div>");
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
  window.statusPlayBot = false;
  window.fleeingFromEnemy = false;
  let hm = new HandlersManager(api);

  hm.registerCommand(BoxInitHandler.ID, new BoxInitHandler());
  hm.registerCommand(ResourceInitHandler.ID, new ResourceInitHandler());
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
  hm.registerEvent("isDisconnected", new HeroDisconnectedEventHandler());
  hm.registerEvent("isConnected", new HeroConnectedEventHandler());

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

  api.reconnectTime = null;

  $(document).keyup(function (e) {
    let key = e.key;

    if (key == "x" || key == "z") {
      let maxDist = 1000;
      let finDist = 1000000;
      let finalShip;

      for (let property in api.ships) {
        let ship = api.ships[property];
        let dist = ship.distanceTo(window.hero.position);

        if (dist < maxDist && dist < finDist && ((ship.isNpc && window.settings.lockNpcs && key == "x") || (ship.isEnemy && window.settings.lockPlayers && key == "z" && !ship.isNpc))) {
          finalShip = ship;
          finDist = dist;
        }
      }

      if (finalShip != null) {
        api.lockShip(finalShip);
        if (window.settings.autoAttack) {
          api.startLaserAttack();
          api.lastAttack = $.now();
          api.attacking = true;
        }
      }
    }
  });

  window.settings.pause = true;
  $(document).on('click', '.cnt_minimize_window', () => {
    if (window.statusMiniWindow) {
      window.mainWindow.slideUp();
    } else {
      window.mainWindow.slideDown();
    }

    window.statusMiniWindow = !window.statusMiniWindow;
  });

  let cntBtnPlay = $('.cnt_btn_play .btn_play');
  cntBtnPlay.on('click', (e) => {
    if (window.statusPlayBot) {
      cntBtnPlay.html("Play");
      cntBtnPlay.removeClass('in_stop').addClass('in_play');
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      window.fleeingFromEnemy = false;
      window.settings.pause = true;
    } else {
      cntBtnPlay.html("Stop");
      cntBtnPlay.removeClass('in_play').addClass('in_stop');
      window.settings.pause = false;
    }

    window.statusPlayBot = !window.statusPlayBot;
  });
}

function logic() {
  let collectBoxWhenCircle = false;
  let circleBox = null;

  if (api.heroDied) {
    return;
  }

  if (api.isDisconnected) {
    if (window.fleeingFromEnemy) {
      window.fleeFromEnemy = false;
    }
    if (api.disconnectTime && $.now() - api.disconnectTime > 20000 && (!api.reconnectTime || api.reconnectTime && $.now() - api.reconnectTime > 12000) && window.reviveCount < window.settings.reviveLimit)
      api.reconnect();
    return;
  }

  window.minimap.draw();

  if (api.isRepairing && window.hero.hp !== window.hero.maxHp) {
    return;
  } else if (api.isRepairing && window.hero.hp === window.hero.maxHp) {
    api.isRepairing = false;
  }

  if (window.settings.fleeFromEnemy && window.fleeingFromEnemy) {
    window.dispatchEvent(new CustomEvent("logicEnd"));
    return;
  }

  if (window.settings.pause) {
    window.dispatchEvent(new CustomEvent("logicEnd"));
    return;
  }

  if (window.settings.fleeFromEnemy) {
    var enemyResult = api.checkForEnemy();

    if (enemyResult.run) {
      let gate = api.findNearestGateForRunAway(enemyResult.enemy);
      if (gate.gate) {
        let x = gate.gate.position.x + MathUtils.random(-100, 100);
        let y = gate.gate.position.y + MathUtils.random(-100, 100);
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        api.move(x, y);
        window.movementDone = false;
        window.fleeingFromEnemy = true;
        setTimeout(() => {
          window.movementDone = true;
          window.fleeingFromEnemy = false;
        }, MathUtils.random(30000, 35000));
        return;
      }
    }
  }

  if (api.targetBoxHash == null && api.targetShip == null) {
    let pos = window.hero.position;
    if (window.settings.zeta) {
      let ggZeta = api.findNearestGatebyID(54);
      if (ggZeta.gate) {
        let x = ggZeta.gate.position.x;
        let y = ggZeta.gate.position.y;
        if (window.hero.position.distanceTo(ggZeta.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.kappa) {
      let ggKappa = api.findNearestGatebyID(70);
      if (ggKappa.gate) {
        let x = ggKappa.gate.position.x;
        let y = ggKappa.gate.position.y;
        if (window.hero.position.distanceTo(ggKappa.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.delta) {
      let ggDelta = api.findNearestGatebyID(5);
      if (ggDelta.gate) {
        let x = ggDelta.gate.position.x;
        let y = ggDelta.gate.position.y;
        if (window.hero.position.distanceTo(ggDelta.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.alpha) {
      let ggAlpha = api.findNearestGatebyID(2);
      if (ggAlpha.gate) {
        let x = ggAlpha.gate.position.x;
        let y = ggAlpha.gate.position.y;
        if (window.hero.position.distanceTo(ggAlpha.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.beta) {
      let ggBeta = api.findNearestGatebyID(3);
      if (ggBeta.gate) {
        let x = ggBeta.gate.position.x;
        let y = ggBeta.gate.position.y;
        if (window.hero.position.distanceTo(ggBeta.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.gamma) {
      let ggGamma = api.findNearestGatebyID(4);
      if (ggGamma.gate) {
        let x = ggGamma.gate.position.x;
        let y = ggGamma.gate.position.y;
        if (window.hero.position.distanceTo(ggGamma.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.epsilon) {
      let ggEpsilon = api.findNearestGatebyID(53);
      if (ggEpsilon.gate) {
        let x = ggEpsilon.gate.position.x;
        let y = ggEpsilon.gate.position.y;
        if (window.hero.position.distanceTo(ggEpsilon.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.kuiper) {
      let ggKuiper = api.findNearestGatebyID(82);
      if (ggKuiper.gate) {
        let x = ggKuiper.gate.position.x;
        let y = ggKuiper.gate.position.y;
        if (window.hero.position.distanceTo(ggKuiper.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.lambda) {
      let ggLambda = api.findNearestGatebyID(71);
      if (ggLambda.gate) {
        let x = ggLambda.gate.position.x;
        let y = ggLambda.gate.position.y;
        if (window.hero.position.distanceTo(ggLambda.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }

    if (window.settings.hades) {
      let ggHades = api.findNearestGatebyID(74);
      if (ggHades.gate) {
        let x = ggHades.gate.position.x;
        let y = ggHades.gate.position.y;
        if (window.hero.position.distanceTo(ggHades.gate.position) < 200) {
          api.jumpGate();
        }
        api.targetShip = null;
        api.attacking = false;
        api.triedToLock = false;
        api.lockedShip = null;
        api.targetBoxHash = null;
        if (pos.x != x && pos.y != y) {
          api.move(x, y);
          window.movementDone = false;
        }
        return;
      }
    }
  }

  if (window.X1Map) {
    return;
  }

  if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent) {
    let gate = api.findNearestGate();
    if (gate.gate) {
      let x = gate.gate.position.x + MathUtils.random(-100, 100);
      let y = gate.gate.position.y + MathUtils.random(-100, 100);
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      api.targetBoxHash = null;
      api.isRepairing = true;
      if (window.hero.position.x != ggKappa.gate.position.x && window.hero.position.y != ggKappa.gate.position.y) {
          api.move(x, y);
          window.movementDone = false;
        }
      return;
    }
  }

  if (api.targetBoxHash == null && api.targetShip == null) {
    let box = api.findNearestBox();
    let ship = api.findNearestShip();

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
        let dist = api.targetShip.distanceTo(window.hero.position);
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

    if (!api.attacking && api.lockedShip && api.lockedShip.shd + 1 != api.lockedShip.maxShd && window.settings.avoidAttackedNpcs) {
      notrightId = api.lockedShip.id;
      api.targetShip = null;
      api.attacking = false;
      api.triedToLock = false;
      api.lockedShip = null;
      return;
    }

    if (!api.attacking && api.lockedShip && api.lockedShip.shd + 1 == api.lockedShip.maxShd && window.settings.avoidAttackedNpcs || !api.attacking && api.lockedShip && !window.settings.avoidAttackedNpcs) {
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
      if (box.type != "MUCOSUM" ||
        box.type != "PRISMATIUM" ||
        box.type != "SCRAPIUM" ||
        box.type != "BOLTRUM" ||
        box.type != "AURUS_BOX" ||
        box.type != "BIFENON" ||
        box.type != "HYBRID_ALLOY_BOX") {
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

  let x;
  let y;

  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium) {
    x = MathUtils.random(100, 20732);
    y = MathUtils.random(58, 12830);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && window.settings.palladium) {
    x = MathUtils.random(17873, 32264);
    y = MathUtils.random(20982, 25515)
  }

  if (api.targetShip && window.settings.killNpcs && api.targetBoxHash == null) {
    api.targetShip.update();
    let dist = api.targetShip.distanceTo(window.hero.position);

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
        if (dist > window.settings.npcCircleRadius + 100) {
          x = enemy.x + window.settings.npcCircleRadius * Math.sin(f);
          y = enemy.y + window.settings.npcCircleRadius * Math.cos(f);
        } else {
          x = enemy.x;
          y = enemy.y;
        };
        let nearestBox = api.findNearestBox();
        if (nearestBox && nearestBox.box && nearestBox.distance < 300) {
          circleBox = nearestBox;
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
    if (collectBoxWhenCircle && circleBox) {
      api.collectBox(circleBox.box);
      api.targetBoxHash = circleBox.box.hash;
      collectBoxWhenCircle = false;
      circleBox = null;
    }
    window.movementDone = false;
  }

  window.dispatchEvent(new CustomEvent("logicEnd"));
}