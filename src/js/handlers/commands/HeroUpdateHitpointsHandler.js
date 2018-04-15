class HeroUpdateHitpointsHandler {
  static get ID() {
    return 27024;
  }

  constructor() {
    this._handler = (e, a) => {
      var parsedJson = JSON.parse(e.detail);
      /*console.log(parsedJson);*/

      window.hero.maxHp = parsedJson[Variables.hpUpdateMaxHp];
      window.hero.hp = parsedJson[Variables.hpUpdateHp];
    }
  }

  get handler() {
    return this._handler;
  }
}