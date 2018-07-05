/*
Created by Freshek on 13.10.2017
*/

class Vector2D {
  constructor(x, y) {
    this._x = parseInt(x);
    this._y = parseInt(y);
  }

  distanceTo(vector) {
    if (vector instanceof Vector2D) {
      return Math.sqrt(Math.pow(vector.x - this._x, 2) + Math.pow(vector.y - this._y, 2));
    }
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set(x, y) {
    this._x = parseInt(x);
    this._y = parseInt(y);
  }

  same(vector) {
    if (vector instanceof Vector2D) {
      return (vector.x == this._x && vector.y == this._y);
    }
  }
}
