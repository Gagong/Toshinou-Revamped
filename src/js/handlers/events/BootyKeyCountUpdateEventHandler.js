class BootyKeyCountUpdateEventHandler {
    constructor() {
      this._handler = function (e) {
        var positions = e.detail.split("|");
        window.greenOrGoldBootyKeyCount = parseInt(positions[0]);
        window.blueBootyKeyCount = parseInt(positions[1]);
        window.redBootyKeyCount = parseInt(positions[2]);
        window.masqueBootyKeyCount = parseInt(positions[3]);
      }
    }
  
    get handler() {
      return this._handler;
    }
  }