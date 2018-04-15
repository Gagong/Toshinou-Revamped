class HeroInitHandler {
  static get ID() {
    return 7902;
  }

  constructor(f) {
    this._handler = function (e, a) {
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
      /*console.log(heroJson);*/

      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y, heroJson.factionId, heroJson.userId, heroJson.mapId);
      }

      window.hero.maxHp = heroJson[Variables.heroInitMaxHp];
      window.hero.hp = heroJson[Variables.heroInitHp];
      window.hero.maxShd = heroJson[Variables.heroInitMaxShd];
      window.hero.shd = heroJson["shield"];
      window.hero.mapId = heroJson["mapId"]

      f();
      window.initialized = true;
    }
  }

  get handler() {
    return this._handler;
  }
}