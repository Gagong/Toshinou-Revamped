/*
Created by Freshek on 15.10.2017
*/

class Ship extends Movable {
  constructor(x, y, id, isnpc, name, factionId, clanDiplomacy) {
    super(x, y);
    this.id = id;
    this.isNpc = isnpc;
    this.name = name;
    this.factionId = factionId;
    this.isAttacked = false;
    this.clanDiplomacy = clanDiplomacy.type;
  }

  setTarget(targetX, targetY, time) {
    this.target = new Vector2D(targetX, targetY);
    this.timeToTarget = parseInt(time);
    this.lastUpdate = $.now();
  }

  get isEnemy() {
    return (window.hero.factionId != this.factionId && this.clanDiplomacy != 1 && this.clanDiplomacy != 2 || this.clanDiplomacy == 3);
  }

  get percentOfHp() {
    return (this.hp && this.maxHp) ? MathUtils.percentFrom(this.hp, this.maxHp) : 100;
  }

  update() {
    if (this.target == null)
      return;

    var diff = $.now() - this.lastUpdate;

    if (diff > this.timeToTarget) {
      this.position.set(this.target.x, this.target.y);
      return this.position;
    }

    /*
     * quick and dirty solution
     * TODO atan2 instead of this
     */

    var dx = this.target.x - this.position.x;
    var dy = this.target.y - this.position.y;

    var sx = dx / this.timeToTarget;
    var sy = dy / this.timeToTarget;

    this.lastUpdate = $.now();

    this.position.set(this.position.x + sx * diff, this.position.y + sy * diff);
  }
}