class MovementDoneEventHandler {
  constructor() {
    this._handler = function () {
      window.movementDone = true;
    }
  }

  get handler() {
    return this._handler;
  }
}