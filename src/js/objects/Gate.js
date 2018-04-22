class Gate extends Movable {
  constructor(x, y, factionId, gateId, gateType) {
    super(x, y);
    this.factionId = factionId;
    this.gateId = gateId;
    this.gateType = gateType;
  }
}