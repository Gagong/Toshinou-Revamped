/*
Created by Freshek on 13.10.2017
*/

class Movable {
  constructor(x, y) {
    this.position = new Vector2D(x, y);
  }

  setPosition(x, y) {
    this.position.set(x, y);
  }

  distanceTo(vector) {
    return this.position.distanceTo(vector);
  }
}