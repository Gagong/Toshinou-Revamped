class BattlestationModule extends Movable {
  constructor(x, y, name, factionId) {
    super(x, y);
    this.name = name;
    this.factionId = factionId;
  }
}