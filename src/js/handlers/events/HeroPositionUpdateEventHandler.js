class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function (e) {
      let positions = e.detail.split("|");

      window.hero.setPosition(positions[0], positions[1]);
      window.count = parseInt(positions[2]);
      window.msqbcount = parseInt(positions[3]);
      window.bcount = parseInt(positions[4]);
      window.rcount = parseInt(positions[5]);
    }
  }

  get handler() {
    return this._handler;
  }
}