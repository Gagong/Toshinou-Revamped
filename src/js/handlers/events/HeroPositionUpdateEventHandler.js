class HeroPositionUpdateEventHandler {
  constructor() {
    this._handler = function (e) {
      let positions = e.detail.split("|");

      window.hero.setPosition(positions[0], positions[1]);
      window.greenOrGoldBootyKeyCount = parseInt(positions[2]);
      window.masqueBootyKeyCount = parseInt(positions[3]);
      window.blueBootyKeyCount = parseInt(positions[4]);
      window.redBootyKeyCount = parseInt(positions[5]);
    }
  }

  get handler() {
    return this._handler;
  }
}