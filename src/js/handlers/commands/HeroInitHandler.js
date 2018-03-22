/*
Created by Freshek on 13.10.2017
*/

class HeroInitHandler {
  static get ID() {
    return 7902;
  }

  constructor(f) {
    this._handler = function(e, a) {
      e.detail = e.wholeMessage.split("|").slice(1).join("");
      a.ships = [];
      a.boxes = {};
      a.gates = [];
      a.targetShip = null;
      a.attacking = false;
      a.triedToLock = false;
      a.lockedShip = null;
      a.heroDied = false;
      a.targetBoxHash = null;
      a.battlestation = null;
      Injector.injectScript("window.heroDied = false;");

      var heroJson = JSON.parse(e.detail);

      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y, heroJson.factionId, heroJson.userId);
      }

      window.hero.maxHp = heroJson[Variables.heroInitMaxHp];
      window.hero.hp = heroJson[Variables.heroInitHp];
      window.hero.maxShd = heroJson[Variables.heroInitMaxShd];
      window.hero.shd = heroJson["shield"];

      f();
      window.initialized = true;
    }
  }

  get handler() {
    return this._handler;
  }
}
