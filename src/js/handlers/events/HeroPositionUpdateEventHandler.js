class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function (e) {
      var positions = e.detail.split("|");
      /*console.log(positions);*/
      window.hero.setPosition(positions[0], positions[1]);
      window.count = parseInt(positions[3]);
      window.msqbcount = parseInt(positions[4]);
      window.bcount = parseInt(positions[5]);
      window.rcount = parseInt(positions[6]);
    }
  }

  get handler() {
    return this._handler;
  }
}