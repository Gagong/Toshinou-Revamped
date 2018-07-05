/*
Created by Freshek on 07.10.2017
*/

class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function (e) {
      var positions = e.detail.split("|");
      window.hero.setPosition(positions[0], positions[1]);
    }
  }

  get handler() {
    return this._handler;
  }
}