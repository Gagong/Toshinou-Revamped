class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function (e) {
      let positions = e.detail.split("|");
      /*console.log(positions);*/
      window.hero.setPosition(positions[0], positions[1]);
      window.greenAndGoldBootyKeyCount = parseInt(positions[3]);
      window.masqueBootyKeyCount = parseInt(positions[4]);
      window.blueBootyKeyCount = parseInt(positions[5]);
      window.redBootyKeyCount = parseInt(positions[6]);
      window.blackBootyKeyCount = parseInt(positions[7]);
    }
  }

  get handler() {
    return this._handler;
  }
}