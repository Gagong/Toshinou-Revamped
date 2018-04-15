class Movable {
  constructor(x, y) {
    this.position = new Vector2D(x, y);
    /*console.log(this);*/
  }

  setPosition(x, y) {
    this.position.set(x, y);
  }

  distanceTo(vector) {
    return this.position.distanceTo(vector);
  }
}