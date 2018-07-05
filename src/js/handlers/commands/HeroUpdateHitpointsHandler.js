/*
Created by Freshek on 28.11.2017
*/

class HeroUpdateHitpointsHandler {
  static get ID() {
    return 27257;
  }

  constructor() {
    this._handler = (e, a) => {
      var parsedJson = JSON.parse(e.detail);

      window.hero.maxHp = parsedJson[Variables.hpUpdateMaxHp];
      window.hero.hp = parsedJson[Variables.hpUpdateHp];
    }
  }

  get handler() {
    return this._handler;
  }
}