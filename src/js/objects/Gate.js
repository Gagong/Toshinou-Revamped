class Gate extends Movable {
  constructor(x, y, factionId, gateId) {
    super(x, y);
    this.factionId = factionId;
    this.gateId = gateId;
    /*console.log(this);*/
  }
}
