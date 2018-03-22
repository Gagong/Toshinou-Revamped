/*
Created by Freshek on 30.01.2018
*/

class BattlestationModule extends Movable {
  constructor(x, y, name, factionId) {
    super(x, y);
    this.name = name;
    this.factionId = factionId;
  }
}
