/*
Created by Freshek on 04.11.2017
*/

class Gate extends Movable {
  constructor(x, y, factionId, gateId) {
    super(x, y);
    this.factionId = factionId;
    this.id = gateId;
  }
}