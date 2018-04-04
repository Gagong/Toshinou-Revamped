class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function(e) {
      var positions = e.detail.split("|");
      /*console.log(positions);*/
      window.hero.setPosition(positions[0], positions[1]);
      /*console.log("Keys - ", positions[3]);*/
      window.count = positions[3];
    }
  }

  get handler() {
    return this._handler;
  }
}
