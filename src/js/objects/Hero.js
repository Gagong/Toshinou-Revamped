/*
Created by Freshek on 07.10.2017
*/

class Hero extends Movable {
  constructor(x, y, factionId, id) {
    super(x, y);
    this.factionId = factionId;
    this.targetShip = null;
    this.id = id;
  }

  move(pos) {
    if (pos instanceof Vector2D) {
      Injector.injectScript('document.getElementById("preloader").moveShip(' + pos.x + ',' + pos.y + ');');
    }
  }
}