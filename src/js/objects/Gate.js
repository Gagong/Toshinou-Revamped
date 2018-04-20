class Gate extends Movable {
  constructor(x, y, factionId, gateId, Gatetype) {
    super(x, y);
    this.factionId = factionId;
    this.gateId = gateId;
    this.Gatetype = Gatetype;
  }
}