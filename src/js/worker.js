window.globalSettings = new GlobalSettings();
let api;
let notrightId;
<<<<<<< HEAD
=======
let state = false;
>>>>>>> upstream/beta

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
<<<<<<< HEAD
=======
  window.saved = false;
  window.loaded = false;
  window.refreshed = false;
>>>>>>> upstream/beta
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

  window.autolockWindow = new AutolockWindow();
  window.autolockWindow.createWindow();

  window.npcSettingsWindow = new NpcSettingsWindow();
  window.npcSettingsWindow.createWindow();

  window.statisticWindow = new StatisticWindow();
  window.statisticWindow.createWindow();

  Injector.injectScriptFromResource("res/injectables/HeroPositionUpdater.js");

  window.setInterval(logic, window.tickTime);


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
<<<<<<< HEAD
}

function logic() {
  let collectBoxWhenCircle = false;
  let circleBox = null;
  let palladiumBlackList = [
    "-=[ Battleray ]=-",
    "( Uber Annihilator )", 
    "( Uber Saboteur )", 
    "( Uber Barracuda )",
  ];
  
  if (window.hero.id == 73704408 || window.hero.id == 71224317 || window.hero.id == 167910851) {
=======
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
  let palladiumBlackList = [
    "( Uber Annihilator )", 
    "( Uber Saboteur )", 
    "( Uber Barracuda )",
    "-=[ Battleray ]=-",
  ];

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

  if (heroId == 73704408 || heroId == 71224317 || heroId == 167910851 || heroId == 46885713 || heroId == 166113951 || heroId == 42039716) {
>>>>>>> upstream/beta
    return;
  }  

  if (api.isDisconnected) {
    if (window.fleeingFromEnemy) {
      window.fleeFromEnemy = false;
    }
    if (api.disconnectTime && $.now() - api.disconnectTime > 10000 && (!api.reconnectTime || (api.reconnectTime && $.now() - api.reconnectTime > 15000)) && window.reviveCount < window.settings.reviveLimit) {
      api.reconnect();
    }
    return;
  }

<<<<<<< HEAD
  /*if ($.now() - api.getSettingsTime > 60000) {
    console.log("Getting settings...")
    for (let key in window.settings) {
      chrome.storage.sync.get(key, function(set) {
        window.settings[key] = set[key];
      })
    }
    api.getSettingsTime = $.now();
  }

  if ($.now() - api.setSettingsTime > 5000000 && window.settings.refresh) {
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
  }*/

  window.minimap.draw();

  if (api.heroDied || window.settings.pause || (window.settings.fleeFromEnemy && window.fleeingFromEnemy)) {
    return;
  }

=======
  if (window.globalSettings.enableRefresh) {
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

  if (api.heroDied || window.settings.pause || (window.settings.fleeFromEnemy && window.fleeingFromEnemy)) {
    api.resetTarget("all");
    return;
  }

  if ($.now() - api.setSettingsTime > window.globalSettings.refreshTime * 60000 && window.settings.refresh && window.globalSettings.enableRefresh) {
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

>>>>>>> upstream/beta
  if (api.isRepairing && window.hero.hp !== window.hero.maxHp) {
    return;
  } else if (api.isRepairing && window.hero.hp === window.hero.maxHp) {
    api.isRepairing = false;
  }

  if (api.targetBoxHash == null) {
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

  if (window.X1Map) {
    return;
  }

  if ($.now() - api.resetBlackListTime > api.blackListTimeOut) {
    api._blackListedBoxes = [];
    api.resetBlackListTime = $.now();
  }

  if (window.hero.mapId == 73)
    api.ggZetaFix();

  if (window.hero.mapId == 55)
    api.ggDeltaFix();

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
        setTimeout(() => {
          window.movementDone = true;
          window.fleeingFromEnemy = false;
        }, MathUtils.random(30000, 35000));
        return;
      }
    }
  }
<<<<<<< HEAD
  
=======
>>>>>>> upstream/beta

  if (MathUtils.percentFrom(window.hero.hp, window.hero.maxHp) < window.settings.repairWhenHpIsLowerThanPercent) {
    let gate = api.findNearestGate();
    if (gate.gate) {
      let x = gate.gate.position.x + MathUtils.random(-100, 100);
      let y = gate.gate.position.y + MathUtils.random(-100, 100);
      api.resetTarget("all");
      api.isRepairing = true;
      api.move(x, y);
      window.movementDone = false;
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
    } else if (ship.ship && ship.distance < 1000 && window.settings.killNpcs && ship.ship.id != notrightId) {
      api.lockShip(ship.ship);
      api.triedToLock = true;
      api.targetShip = ship.ship;
      return;
    } else if (ship.ship && window.settings.killNpcs && ship.ship.id != notrightId) {
      ship.ship.update();
<<<<<<< HEAD
      if (ship.ship.modifier.length == 0 || ship.ship.modifier.activated == false) {
        api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
        api.targetShip = ship.ship;
        return;
      } else {
        api.resetTarget("enemy");
      }
=======
      api.move(ship.ship.position.x - MathUtils.random(-50, 50), ship.ship.position.y - MathUtils.random(-50, 50));
      api.targetShip = ship.ship;
      return;
>>>>>>> upstream/beta
    }
  }

  if (api.targetShip && window.settings.killNpcs) {
    if (!api.triedToLock && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id)) {
      api.targetShip.update();
<<<<<<< HEAD
      if (api.targetShip.modifier.length == 0 || api.targetShip.modifier.activated == false) {
        let dist = api.targetShip.distanceTo(window.hero.position);
        if (dist < 600) {
          api.lockShip(api.targetShip);
          api.triedToLock = true;
          return;
        }
      } else {
        api.resetTarget("enemy");
=======
      let dist = api.targetShip.distanceTo(window.hero.position);
      if (dist < 600) {
        api.lockShip(api.targetShip);
        api.triedToLock = true;
        return;
>>>>>>> upstream/beta
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

<<<<<<< HEAD
  if ((api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) ||
    ($.now() - api.lastAttack > 10000) ||
    (api.targetShip && (api.targetShip.modifier.length != 0 || api.targetShip.modifier.activated == false))) {
=======
  if ((api.targetShip && $.now() - api.lockTime > 5000 && !api.attacking) || ($.now() - api.lastAttack > 10000)) {
>>>>>>> upstream/beta
    api.resetTarget("enemy");
  }

  let x;
  let y;
<<<<<<< HEAD

  if (window.settings.palladium) {
    palladiumBlackList.forEach(npc => {
      window.settings.setNpc(npc, true);
    });
    window.settings.moveRandomly = true;
    //window.settings.killNpcs = true;
    window.settings.circleNpc = true;
    window.settings.npcCircleRadius = 612;

    let shipsAround=api.ggCountNpcAround();
    if(shipsAround>0){
      let percenlife=MathUtils.percentFrom(window.hero.hp, window.hero.maxHp);
      if(percenlife < 99 && percenlife>70) {
        window.settings.killNpcs = true;
        collectBoxWhenCircle=true;
      }else if(percenlife < 70) {
        window.settings.killNpcs = true;
        collectBoxWhenCircle=false;
      }else{
        window.settings.killNpcs = false;
      }
    }
  }

  if(window.settings.debug){
    let shipsAround=api.ggCountNpcAround();
    console.log(shipsAround);
  }
    /*GG BOT for Alpha, Beta and Gamma Gates*/
  if(window.settings.ggbot){
    window.settings.alpha=true;
    window.settings.beta=true;
    window.settings.gamma=true;
    window.settings.moveRandomly = true;
    window.settings.killNpcs = true;
    window.settings.circleNpc = true;
    window.settings.resetTargetWhenHpBelow25Percent=true;
    
    let shipsAround=api.ggCountNpcAround();
    if(shipsAround<=0){
      attackNPCinCorner=true;
    }else{
      attackNPCinCorner=false;
    }
  }
  
  /*Dodge the CBS*/
  if(window.settings.dodgeTheCbs){
    if(api.battlestation!=null){
      if(api.battlestation.isEnemy){
       let result=api.checkForCBS();
       if(result.walkAway){
         let f = Math.atan2(window.hero.position.x - result.cbsPos.x, window.hero.position.y - result.cbsPos.y) + 0.5;
         let s = Math.PI / 180;
         f += s;
         x = result.cbsPos.x + 1800 * Math.sin(f);
         y = result.cbsPos.y + 1800 * Math.cos(f);
		 api.move(x, y);
       }
     }
    }
  }
  
=======

  if (window.settings.palladium) {
    palladiumBlackList.forEach(npc => {
      window.settings.setNpc(npc, true);
    });
    window.settings.moveRandomly = true;
    window.settings.killNpcs = true;
    window.settings.circleNpc = true;
  }

>>>>>>> upstream/beta
  if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium && !window.bigMap) {
    x = MathUtils.random(200, 20800);
    y = MathUtils.random(200, 12900);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && !window.settings.palladium && window.bigMap) {
    x = MathUtils.random(500, 41500);
    y = MathUtils.random(500, 25700);
  } else if (api.targetBoxHash == null && api.targetShip == null && window.movementDone && window.settings.moveRandomly && window.settings.palladium) {
<<<<<<< HEAD
    x = MathUtils.random(17873, 32264);
    y = MathUtils.random(20982, 25515)
=======
    x = MathUtils.random(13000, 30400);
    y = MathUtils.random(19000, 25500)
>>>>>>> upstream/beta
  }

  if (api.targetShip && window.settings.killNpcs && api.targetBoxHash == null) {
    api.targetShip.update();
    let dist = api.targetShip.distanceTo(window.hero.position);
    if ((dist > 600 && (api.lockedShip == null || api.lockedShip.id != api.targetShip.id) && $.now() - api.lastMovement > 1000)) {
      x = api.targetShip.position.x - MathUtils.random(-50, 50);
      y = api.targetShip.position.y - MathUtils.random(-50, 50);
      api.lastMovement = $.now();
    } else if (api.lockedShip && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id && window.settings.dontCircleWhenHpBelow25Percent) {
      if (dist > 450) {
        x = api.targetShip.position.x + MathUtils.random(-30, 30);
        y = api.targetShip.position.y + MathUtils.random(-30, 30);
      }
    }else if (api.lockedShip && api.lockedShip.percentOfHp < 25 && api.lockedShip.id == api.targetShip.id && window.settings.resetTargetWhenHpBelow25Percent) {
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
<<<<<<< HEAD
        if(collectBoxWhenCircle){
          let nearestBox = api.findNearestBox();
          if (nearestBox && nearestBox.box && nearestBox.distance < 300) {
            circleBox = nearestBox;
          }
        }
=======
        /*let nearestBox = api.findNearestBox();
        if (nearestBox && nearestBox.box && nearestBox.distance < 300) {
          circleBox = nearestBox;
          collectBoxWhenCircle = true;
        }*/
>>>>>>> upstream/beta
      }
    } else {
      api.resetTarget("enemy");
    }
  }

  if (x && y) {
    api.move(x, y);
<<<<<<< HEAD
    if (collectBoxWhenCircle && circleBox) {
      api.collectBox(circleBox.box);
      collectBoxWhenCircle = false;
      circleBox = null;
    }
=======
    /*if (collectBoxWhenCircle && circleBox) {
      api.collectBox(circleBox.box);
      collectBoxWhenCircle = false;
      circleBox = null;
    }*/
>>>>>>> upstream/beta
    window.movementDone = false;
  }
  window.dispatchEvent(new CustomEvent("logicEnd"));
}

