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

      let heroJson = JSON.parse(e.detail);

      if (window.hero == null) {
        window.hero = new Hero(heroJson.x, heroJson.y, heroJson.factionId, heroJson.userId, heroJson.mapId);
      }

      window.hero.maxHp = heroJson[Variables.heroInitMaxHp];
      window.hero.hp = heroJson[Variables.heroInitHp];
      window.hero.maxShd = heroJson[Variables.heroInitMaxShd];
      window.hero.shd = heroJson["shield"];
      window.hero.mapId = heroJson["mapId"]

      if (window.hero.mapId == 16 || window.hero.mapId == 29 || window.hero.mapId == 91 || window.hero.mapId == 93) {
        window.b1 = 42000 / 300;
        window.b2 = 26200 / 150;
        window.b3 = 700;
      } else {
        window.b1 = 21000 / 300;
        window.b2 = 13100 / 150;
        window.b3 = 350;
      }

      f();
      window.initialized = true;
    }
  }

  get handler() {
    return this._handler;
  }
}