window.globalSettings = new GlobalSettings();
let api;
let notrightId;
let state = false;

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
  window.newSettings = new Settings();
  window.initialized = false;
  window.reviveCount = 0;
  window.count = 0;
  window.movementDone = true;
  window.statusPlayBot = false;
  window.saved = false;
  window.loaded = false;
  window.refreshed = false;
  window.fleeingFromEnemy = false;
  window.debug = false;
  window.tickTime = window.globalSettings.timerTick;
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

  window.npcSettingsWindow = new NpcSettingsWindow();
  window.npcSettingsWindow.createWindow();

  window.statisticWindow = new StatisticWindow();
  window.statisticWindow.createWindow();

  window.MapSettingsWindow = new MapSettingsWindow();
  window.MapSettingsWindow.createWindow();
  
  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, window.tickTime);



  $(document).keyup(function (e) {
    let key = e.key;

    if (key == "Pause") {
      if (!window.settings.pause) {
        $('.cnt_btn_play .btn_play').html("Play").removeClass('in_stop').addClass('in_play');
        api.resetTarget("all");
        window.fleeingFromEnemy = false;
        window.settings.pause = true;
      } else {
        $('.cnt_btn_play .btn_play').html("Stop").removeClass('in_play').addClass('in_stop');
        window.settings.pause = false;
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
      api.resetTarget("all");
      window.fleeingFromEnemy = false;
      window.settings.pause = true;
    } else {
      cntBtnPlay.html("Stop");
      cntBtnPlay.removeClass('in_play').addClass('in_stop');
      window.settings.pause = false;
    }
    window.statusPlayBot = !window.statusPlayBot;
  });
  if (window.globalSettings.enableRefresh) {
    let saveBtn = $('.saveButton .btn_save');
    saveBtn.on('click', (e) => {
      if (window.saved) {
        saveBtn.html("Save settings & Enable refresh");
        saveBtn.removeClass('saved').addClass('save');
        window.settings.refresh = false;
        window.settings.pause = true;
        api.setSettings();
      } else {
        saveBtn.html("Saved & Enabled");
        saveBtn.removeClass('save').addClass('saved');
        window.settings.refresh = true;
        window.settings.pause = false;
        api.setSettings();
      }
      window.saved = !window.saved;
    });
  }
}

function logic() {
  let heroId = window.hero.id;
  let collectBoxWhenCircle = false;
  let circleBox = null;

  let NPCSavingFix = [
    "-=[ Devolarium ]=-",
    "..::{ Boss Devolarium }::..",
    "-=[ Sibelon ]=-",
    "..::{ Boss Sibelon }::..",    
    "..::{ Boss Lordakium }::...",
    "-=[ Blighted Kristallon ]=-",
    "..::{ Boss StreuneR }::..",
    "<=< Icy >=>",
    "<=< Ice Meteoroid >=>",
    "<=< Super Ice Meteoroid >=>",
    "-=[ Battleray ]=-",
    "( Uber Barracuda )",
    "( Uber Saboteur )",
    "( Uber Annihilator )",
  ];

  if (api.isDisconnected) {
    if (window.fleeingFromEnemy) {
      window.fleeFromEnemy = false;
    }
    if (api.disconnectTime && $.now() - api.disconnectTime > 10000 && (!api.reconnectTime || (api.reconnectTime && $.now() - api.reconnectTime > 15000)) && window.reviveCount < window.settings.reviveLimit) {
      api.reconnect();
    }
    return;
  }

  if (window.globalSettings.enableRefresh && !window.settings.ggbot) {
    if (window.globalSettings.enableNPCBlockList) {
      NPCSavingFix.forEach(npc => {
        window.settings.setNpc(npc, true);
      });
    };
    if ($.now() - api.getSettingsTime > 10000) {
      api.getSettings();
      if (window.newSettings.refresh)
        api.updateSettings();
    }
  }

  window.minimap.draw();

  if (api.heroDied || window.settings.pause) {
    api.resetTarget("all");
    return;
  }

  if (($.now() - api.setSettingsTime > window.globalSettings.refreshTime * 60000 || api.disconnectTime > 100000) && window.settings.refresh && window.globalSettings.enableRefresh && !window.settings.ggbot) {
    if ((api.Disconected && !state) || window.settings.palladium) {
      window.location.reload();
      state = true;
    } else {
      let gate = api.findNearestGate();
      if (gate.gate) {
        let x = gate.gate.position.x;
        let y = gate.gate.position.y;
        if (window.hero.position.distanceTo(gate.gate.position) < 200 && !state) {
          window.location.reload();
          state = true;
        }
        api.resetTarget("all");
        api.move(x, y);
        window.movementDone = false;
        return;
      }
    }   
  }

  if ((api.isRepairing && window.hero.hp !== window.hero.maxHp) && !window.settings.ggbot) {
    return;
  } else if (api.isRepairing && window.hero.hp === window.hero.maxHp) {
    api.isRepairing = false;
  }

    if (window.settings.ggbot && api.targetBoxHash == null) {
    api.jumpInGG(2, window.settings.alpha);
    api.jumpInGG(3, window.settings.beta);
    api.jumpInGG(4, window.settings.gamma);
    api.jumpInGG(5, window.settings.delta);
    api.jumpInGG(53, window.settings.epsilon);
    api.jumpInGG(54, window.settings.zeta);
    api.jumpInGG(70, window.settings.kappa);
    api.jumpInGG(71, window.settings.lambda);
    api.jumpInGG(72, window.settings.kronos);
    api.jumpInGG(74, window.settings.hades);
    api.jumpInGG(82, window.settings.kuiper);
  }

  if ($.now() - api.resetBlackListTime > api.blackListTimeOut) {
    api._blackListedBoxes = [];
    api.resetBlackListTime = $.now();
  }

  /*GG BOT for Alpha, Beta and Gamma Gates*/
  if(window.settings.ggbot){
    window.settings.moveRandomly = true;
    window.settings.killNpcs = true;
    window.settings.circleNpc = true;
    window.settings.resetTargetWhenHpBelow25Percent = true;
    window.settings.dontCircleWhenHpBelow25Percent = false;
  }

  if (window.settings.ggbot) {
    if (window.hero.mapId == 73) {
      api.ggZetaFix();
    }else if (window.hero.mapId == 55) {
      api.ggDeltaFix();
    }
  }

  if (window.settings.fleeFromEnemy) {
    let enemyResult = api.checkForEnemy();

    if (enemyResult.run) {
      let gate = api.findNearestGateForRunAway(enemyResult.enemy);
      if (gate.gate) {
        let x = gate.gate.position.x + MathUtils.random(-100, 100);
        let y = gate.gate.position.y + MathUtils.random(-100, 100);
        api.resetTarget("all");
        api.move(x, y);
        window.movementDone = false;
        window.fleeingFromEnemy = true;
        if (window.settings.jumpFromEnemy) {
          api.jumpAndGoBack(gate.gate.gateId);
        }
        setTimeout(() => {
          window.movementDone = true;
          window.fleeingFromEnemy = false;
        }, MathUtils.random(30000, 35000));
        return;
      }
    }
  }

  if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent || api.isRepairing) {
    if (window.settings.ggbot) {
      api.resetTarget("all");
      let npcCount = api.ggCountNpcAround(1000);
      if (npcCount > 0) {
        let ship = api.findNearestShip();
        ship.ship.update();
        let f = Math.atan2(window.hero.position.x - ship.ship.position.x, window.hero.position.y - ship.ship.position.y) + 0.5;
        let s = Math.PI / 180;
        f += s;
        let x = 10890 + 4000 * Math.sin(f);
        let y = 6750 + 4000 * Math.cos(f);
        if (x > 20800 && x < 500 && y > 12900 && y < 500) {//To avoid entering radiation
          x = MathUtils.random(500, 20800);
          y = MathUtils.random(500, 12900);
        } else {
          api.move(x, y);
        }
        api.isRepairing = true;
        return;
      } else {
        return;
      }
    } else {
      let gate = api.findNearestGate();
      if (gate.gate) {
        api.resetTarget("all");
        if (window.settings.jumpFromEnemy) {
          api.jumpAndGoBack(gate.gate.gateId);
        } else {
          let x = gate.gate.position.x + MathUtils.random(-100, 100);
          let y = gate.gate.position.y + MathUtils.random(-100, 100);
          api.move(x, y);
          window.movementDone = false;
          api.isRepairing = true;
          return;
        }
      }
    }
  }

  if (!window.settings.palladium && !window.settings.ggbot && window.settings.travelsystem && (window.settings.workmap != null) &&  window.hero.mapId != window.settings.workmap) {
    api.goToMap(window.settings.workmap);
    return;
  } else {
    api.rute = null;
  }

  if (window.X1Map) {
    return;
  }

  if (api.targetBoxHash == null && api.targetShip == null) {
    let box = api.findNearestBox();
    let ship = api.findNearestShip();

    if ((ship.distance > 1000 || !ship.ship) && (box.box)) {
      api.collectBox(box.box);
      api.targetBoxHash = box.box.hash;
      return;
    } else if (ship.ship && ship.distance < 1000 && window.settings.killNpcs && ship.ship.id != notrightId) {
      api.lockShip(ship.ship);
      api.triedToLock = true;
      api.targetShip = ship.ship;
      return;
    } else if (ship.ship && window.settings.killNpcs && ship.ship.id != notrightId) {
      ship.ship.update();
      api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
      api.targetShip = ship.ship;
      return;
    }
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      api.targetShip.update();
      let dist = api.targetShip.distanceTo(window.hero.position);
      if (dist < 600) {
        api.lockShip(api.targetShip);
        api.triedToLock = true;
        return;
      }
    }

    if (!api.attacking && api.lockedShip && api.lockedShip.shd + 1 != api.lockedShip.maxShd && window.settings.avoidAttackedNpcs) {
      notrightId = api.lockedShip.id;
      api.resetTarget("enemy");
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
      delete api.boxes[api.targetBoxHash];
      api.blackListHash(api.targetBoxHash);
      api.resetTarget("box");
    }
  }

  if ((api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) || ($.now() - api.lastAttack > 10000)) {
    api.resetTarget("enemy");
  }

  let x;
  let y;

  if (window.settings.palladium) {
    let palladiumBlackList = [
    "-=[ Battleray ]=-",
    "( Uber Annihilator )", 
    "( Uber Saboteur )", 
    "( Uber Barracuda )",
    ];
    palladiumBlackList.forEach(npc => {
      window.settings.setNpc(npc, true);
    });
    window.settings.moveRandomly = true;
    window.settings.circleNpc = true;

    let shipsAround = api.ggCountNpcAround(600);
    if (shipsAround > 0) {
      api.battlerayFix();
      let percenlife = MathUtils.percentFrom(window.hero.hp, window.hero.maxHp);
      if (percenlife < 98 && percenlife > 70) {
        window.settings.killNpcs = true;
        collectBoxWhenCircle=true;
      } else if (percenlife < 70) {
        window.settings.killNpcs = true;
        collectBoxWhenCircle = false;
      } else {
        window.settings.killNpcs = false;
      }
    } else {
      window.settings.killNpcs = false;
    }
  }
  
  /*Dodge the CBS*/
  if (window.settings.dodgeTheCbs && api.battlestation != null) {
    if (api.battlestation.isEnemy) {
      let result = api.checkForCBS();
      if (result.walkAway) {
        let f = Math.atan2(window.hero.position.x - result.cbsPos.x, window.hero.position.y - result.cbsPos.y) + 0.5;
        let s = Math.PI / 180;
        f += s;
        x = result.cbsPos.x + 1800 * Math.sin(f);
        y = result.cbsPos.y + 1800 * Math.cos(f);
        api.resetTarget("all");
        api.move(x, y);
        window.movementDone = false;
        return;
      }
    }
  }
  
  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium && !window.bigMap) {
    x = MathUtils.random(200, 20800);
    y = MathUtils.random(200, 12900);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium && window.bigMap) {
    x = MathUtils.random(500, 41500);
    y = MathUtils.random(500, 25700);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && window.settings.palladium) {
    x = MathUtils.random(13000, 30400);
    y = MathUtils.random(19000, 25500)
  }

  if (api.targetShip && window.settings.killNpcs && api.targetBoxHash == null) {
    api.targetShip.update();
    let dist = api.targetShip.distanceTo(window.hero.position);
    if (window.settings.ggbot && api.targetShip.position.x == 20999 && api.targetShip.position.y == 13499) {
    //GG bottom right corner
      x = 20495;
      y = 13363;
    } else if (window.settings.ggbot && api.targetShip.position.x == 0 && api.targetShip.position.y == 0) {
    //GG top left corner
      x = 450;
      y = 302;
    } else if ((dist > 600 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id) && $.now() - api.lastMovement > 1000)) {
      x = api.targetShip.position.x - MathUtils.random(-50, 50);
      y = api.targetShip.position.y - MathUtils.random(-50, 50);
      api.lastMovement = $.now();
    } else if (api.lockedShip && window.settings.dontCircleWhenHpBelow25Percent && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id ) {
      if (dist > 450) {
        x = api.targetShip.position.x + MathUtils.random(-30, 30);
        y = api.targetShip.position.y + MathUtils.random(-30, 30);
      }
    } else if (window.settings.ggbot && window.settings.resetTargetWhenHpBelow25Percent && api.lockedShip && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id ) {
      api.resetTarget("enemy");
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
        if(collectBoxWhenCircle){
          let nearestBox = api.findNearestBox();
          if (nearestBox && nearestBox.box && nearestBox.distance < 100) {
            circleBox = nearestBox;
          }
        }
      }
    } else {
      api.resetTarget("enemy");
    }
  }

  if (x && y) {
    if (collectBoxWhenCircle && circleBox) {
      api.collectBox(circleBox.box);
      collectBoxWhenCircle = false;
      circleBox = null;
    }else{
      api.move(x, y);
    }
    window.movementDone = false;
  }
  window.dispatchEvent(new CustomEvent("logicEnd"));
}

